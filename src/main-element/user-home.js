import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import './ajax-call.js';

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
      <ajax-call id="ajax"></ajax-call>
      <div>
     <h2 id="name">Name : {{name}}</h2>
     <h2 id="account">Account: {{account}}</h2>
     <h2 id="ifsc">IFSC: {{ifsc}}</h2>
     <h2 id="balance">Balance: {{balance}}</h2>
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
  connectedCallback(){
    super.connectedCallback();
    const {customerName,customerAccountNumber,ifsc,totalSavings}=JSON.parse(sessionStorage.getItem('user')) ;
    this.$.ajax._makeAjaxCall('get',`http://localhost:3000/users?customerAccountNumber=${customerAccountNumber}`,null,'ajaxResponse')  
    // this.name= customerName;
    // this.account= customerAccountNumber;
    // this.ifsc= ifsc;
    // this.balance= totalSavings;
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
   ready()
   {
     super.ready();
     this.addEventListener('ajax-response', (e) => this._transactionDetails(e))
   }
   _transactionDetails(event){  
    console.log(event.detail.data)
      this.name= event.detail.data[0].customerName;
    this.account= event.detail.data[0].customerAccountNumber;
    this.ifsc= event.detail.data[0].ifsc;
    this.balance= event.detail.data[0].totalSavings;
   }
}

window.customElements.define('user-home', UserHome);
