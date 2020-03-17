import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class UserHome extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-button{
            background:blueviolet;
            color:white;
        }
      </style>
      <app-location route={{route}}></app-location>
      <div>
     <h2 id="name">Name</h2>
     <h2 id="account">Account</h2>
     <h2 id="ifsc">IFSC</h2>
     <h2 id="balance">Balance</h2>
     </div>
     <div> 
     <paper-button on-click=_handleTransfer>Fund Transfer</paper-button>
     <paper-button on-click=_handleSummary>Transaction Summary</paper-button>
     </div>
    `;
  }
  static get properties() {
    return {
   
    };
  }
  _handleSummary(){
//    window.history.pushState({}, null, '#/transaction-details');
//    window.dispatchEvent(new CustomEvent('location-changed'));
   this.set('route.path','/transaction-details');
  }
  _handleTransfer(){
    // window.history.pushState({}, null, '#/beneficiary-details');
    // window.dispatchEvent(new CustomEvent('location-changed'));
    this.set('route.path','/beneficiary-details');
   }
}

window.customElements.define('user-home', UserHome);
