import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import listAccounts from "@salesforce/apex/UserModeController.listAccounts";
import listAccountsWithSecurityEnforced from "@salesforce/apex/UserModeController.listAccountsWithSecurityEnforced";
import listAccountsWithUserMode from "@salesforce/apex/UserModeController.listAccountsWithUserMode";
import insertAccount from "@salesforce/apex/UserModeController.insertAccount";
import insertAccountAsSystem from "@salesforce/apex/UserModeController.insertAccountAsSystem";
import insertAccountAsUser from "@salesforce/apex/UserModeController.insertAccountAsUser";
import { reduceErrors } from "c/ldsUtils";

export default class UserModeContainer extends LightningElement {
  accountColumns = [
    { label: "Name", fieldName: "Name" },
    { label: "Secure Field", fieldName: "Secure__c" }
  ];

  // No security
  accountsNoSecurity = [];
  nameNoSecurity;
  secureNoSecurity;

  // Security Enforced
  accountsSecurityEnforced = [];
  nameAsSystem;
  secureAsSystem;

  // User mode
  accountsUserMode = [];
  nameAsUser;
  secureAsUser;

  async handleNoSecurity() {
    this.accountsNoSecurity = [];
    try {
      this.accountsNoSecurity = await listAccounts();
    } catch (err) {
      this.showError(err);
    }
  }

  async handleSecurityEnforced() {
    this.accountsSecurityEnforced = [];
    try {
      this.accountsSecurityEnforced = await listAccountsWithSecurityEnforced();
    } catch (err) {
      this.showError(err);
    }
  }

  handleNameNoSecurityChange({ target }) {
    this.nameNoSecurity = target.value;
  }

  handleSecureNoSecurityChange({ target }) {
    this.secureNoSecurity = target.value;
  }

  handleNameAsSystemChange({ target }) {
    this.nameAsSystem = target.value;
  }

  handleSecureAsSystemChange({ target }) {
    this.secureAsSystem = target.value;
  }

  handleNameAsUserChange({ target }) {
    this.nameAsUser = target.value;
  }

  handleSecureAsUserChange({ target }) {
    this.secureAsUser = target.value;
  }

  async handleUserMode() {
    this.accountsUserMode = [];
    try {
      this.accountsUserMode = await listAccountsWithUserMode();
    } catch (err) {
      this.showError(err);
    }
  }

  async handleInsertNoSecurity() {
    try {
      await insertAccount({
        name: this.nameNoSecurity,
        secure: this.secureNoSecurity
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.nameNoSecurity = "";
      this.secureNoSecurity = "";
    }
  }

  async handleInsertAsSystem() {
    try {
      await insertAccountAsSystem({
        name: this.nameAsSystem,
        secure: this.secureAsSystem
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.nameAsSystem = "";
      this.secureAsSystem = "";
    }
  }

  async handleInsertAsUser() {
    try {
      await insertAccountAsUser({
        name: this.nameAsUser,
        secure: this.secureAsUser
      });
    } catch (err) {
      this.showError(err);
    } finally {
      this.nameAsUser = "";
      this.secureAsUser = "";
    }
  }

  showError(err) {
    const toastEvent = new ShowToastEvent({
      title: "An error ocurred",
      message: reduceErrors(err).join(", "),
      variant: "error"
    });
    this.dispatchEvent(toastEvent);
  }
}
