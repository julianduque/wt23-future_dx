import { LightningElement, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";
import { reduceErrors } from "c/ldsUtils";

export default class GraphqlContainer extends LightningElement {
  accountId;
  accountsResults = [];
  accountsError = [];
  contactsResults = [];
  contactsError = [];

  // Accounts Query
  @wire(graphql, {
    query: gql`
      query AllAccounts {
        uiapi {
          query {
            Account(first: 10, orderBy: { Name: { order: ASC } })
              @category(name: "recordQuery") {
              edges {
                node {
                  Id
                  Name @category(name: "StringValue") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `
  })
  accountsQueryResult({ data, errors }) {
    if (data) {
      this.accountsError = [];
      this.accountsResults = data.uiapi.query.Account.edges.map(
        (edge) => edge.node
      );
    }

    if (errors) {
      this.accountsError = errors;
    }
  }

  // Contacts by Account Query
  @wire(graphql, {
    query: gql`
      query contactsByAccount($accountId: ID!) {
        uiapi {
          query {
            Contact(where: { AccountId: { eq: $accountId } })
              @category(name: "recordQuery") {
              edges {
                node {
                  Id
                  Name @category(name: "StringValue") {
                    value
                  }
                  Phone @category(name: "StringValue") {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: "$contactVariables"
  })
  contactsQueryResult({ data, errors }) {
    if (!this.accountId) return;

    if (data) {
      this.contactsError = [];
      this.contactsResults = data.uiapi.query.Contact.edges.map(
        (edge) => edge.node
      );
    }

    if (errors) {
      this.contactsError = errors;
    }
  }

  // GraphQL query variable in a getter to make them reactive
  get contactVariables() {
    return {
      accountId: this.accountId
    };
  }

  get accountOptions() {
    return this.accountsResults.map((account) => ({
      value: account?.Id,
      label: account?.Name?.value
    }));
  }

  get contactsColumns() {
    return [
      { label: "Name", fieldName: "name" },
      { label: "Phone", fieldName: "phone", type: "phone" }
    ];
  }

  get contactsData() {
    return this.contactsResults.map((contact) => ({
      name: contact?.Name?.value,
      phone: contact?.Phone?.value
    }));
  }

  get hasAccounts() {
    return this.accountsResults.length > 0;
  }

  get hasContacts() {
    return this.accountId != null && this.contactsResults.length > 0;
  }

  get error() {
    const errors = [];
    if (this.accountsError.length > 0) {
      errors.push(reduceErrors(this.accountsError));
    }

    if (this.contactsError.length > 0) {
      errors.push(reduceErrors(this.contactsError));
    }
    return errors.filter(Boolean).join(", ");
  }

  handleAccountChange({ target }) {
    this.accountId = target.value;
  }
}
