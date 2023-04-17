import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import fromCSVtoJSON from "@salesforce/apex/DataWeaveController.fromCSVtoJSON";
import fromJSONtoXML from "@salesforce/apex/DataWeaveController.fromJSONtoXML";
import { reduceErrors } from "c/ldsUtils";

export default class DataWeaveContainer extends LightningElement {
  csvInputText;
  jsonOutputText;

  jsonInputText;
  xmlOutputText;

  handleCsvInput({ target }) {
    this.csvInputText = target.value;
  }

  handleJsonInput({ target }) {
    this.jsonInputText = target.value;
  }

  async handleCsvToJson() {
    try {
      this.jsonOutputText = await fromCSVtoJSON({ csv: this.csvInputText });
    } catch (err) {
      this.showError(err);
    }
  }

  async handleJsonToXml() {
    try {
      this.xmlOutputText = await fromJSONtoXML({ json: this.jsonInputText });
    } catch (err) {
      this.showError(err);
    }
  }

  showError(err) {
    console.log(err);
    const toastEvent = new ShowToastEvent({
      title: "An error ocurred",
      message: reduceErrors(err).join(", "),
      variant: "error"
    });
    this.dispatchEvent(toastEvent);
  }
}
