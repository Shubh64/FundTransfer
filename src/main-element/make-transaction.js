import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
/**
 * @customElement
 * @polymer
 */
class MakeTransaction extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #makeTransfer{
            width:50%;
            margin:auto;
        }
      </style>
      <div id="makeTransfer">
      <h3>Make Transfer</h3>
      <span> <h3>Account Number:</h3></span>
      <paper-input id="amount" placeholder="Enter Amount"></paper-input>
      <span><paper-button raised id="addBtn" on-click=_handleAdd>Send Money</paper-button></span>
      </div>
    `;
  }
  static get properties() {
    return {

    };
  }
}

window.customElements.define('make-transaction', MakeTransaction);
