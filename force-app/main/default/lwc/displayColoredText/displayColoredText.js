import { LightningElement, api } from "lwc";

export default class DisplayColoredText extends LightningElement {
  @api
  color = "black";

  @api
  text = "Please enter a message";

  get colorStyle() {
    return `color: ${this.color};`;
  }
}
