import { LightningElement, api } from "lwc";

export default class NotificationMessage extends LightningElement {
  @api variant;

  icons = {
    info: "utility:info",
    success: "utility:success",
    warning: "utility:warning",
    error: "utility:error"
  };

  get altText() {
    return `${this.variant ?? "info"}`;
  }

  get icon() {
    return this.icons[this.variant] ?? this.icons.info;
  }

  get theme() {
    return `slds-scoped-notification slds-media slds-media_center slds-var-m-around_xx-small slds-theme_${this.variant}`;
  }
}
