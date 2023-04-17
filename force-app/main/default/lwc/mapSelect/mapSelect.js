import { LightningElement, api } from "lwc";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";

export default class MapSelect extends LightningElement {
  @api
  set selectedMarkerValue(value) {
    if (value) {
      this._selectedMarkerValue = value;
    }
  }

  get selectedMarkerValue() {
    return this._selectedMarkerValue;
  }

  _selectedMarkerValue = "SFHQ";

  mapMarkers = [
    {
      location: {
        City: "San Francisco",
        Country: "USA",
        PostalCode: "94105",
        State: "CA",
        Street: "The Landmark @ One Market, Suite 300"
      },
      value: "SFHQ",
      title: "The Landmark Building",
      description:
        "The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties", //escape the apostrophe in the string using &#39;
      icon: "standard:account"
    },
    {
      location: {
        // Location Information
        City: "San Francisco",
        Country: "USA",
        PostalCode: "94105",
        State: "CA",
        Street: "50 Fremont St"
      },

      // For onmarkerselect
      value: "SF1-Julies",

      // Extra info for tile in list & info window
      icon: "standard:account",
      title: "Julies Kitchen" // e.g. Account.Name
    },
    {
      location: {
        // Location Information
        City: "San Francisco",
        Country: "USA",
        PostalCode: "94105",
        State: "CA",
        Street: "30 Fremont St."
      },

      // For onmarkerselect
      value: "SF2-Tender",

      // Extra info for tile in list
      icon: "standard:account",
      title: "Tender Greens" // e.g. Account.Name
    }
  ];

  handleMarkerSelect(event) {
    this._selectedMarkerValue = event.target.selectedMarkerValue;

    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "selectedMarkerValue",
      this.selectedMarkerValue
    );
    this.dispatchEvent(attributeChangeEvent);
  }
}
