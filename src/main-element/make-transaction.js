import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import './ajax-call.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';

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
        #colorRed{
          color:red;
        }
      </style>
      <paper-button id="back" on-click="_handleBack">Back</paper-button>
      <ajax-call id="ajax"></ajax-call>
      <div id="makeTransfer">
      <h3>Make Transfer</h3>
      <span> <h3>Account Number:<span id=colorRed>{{account}}</h3></span></span>
      <paper-input id="amount" required allowed-pattern=[0-9] placeholder="Enter Amount"></paper-input>
      <span><paper-button raised id="addBtn" on-click=_handleMoneyTransfer>Send Money</paper-button></span>
      </div>
      <paper-toast id="toast" text={{message}}></paper-toast>
      <app-location route={{route}}></app-location>

    `;
  }
  static get properties() {
    return {

    };
  }
  connectedCallback()
  {  super.connectedCallback();
   this.account=sessionStorage.getItem('account');
  }
  ready()
  {
    super.ready();
    this.addEventListener('ajax-response', (e) => this._ajaxResponse(e))
  }
  _handleMoneyTransfer(){
    this.amount = this.$.amount.value;
    console.log(this.amount);
    const postObj=JSON.parse(sessionStorage.getItem('user')); 
    const fromBal=postObj.totalSavings;
    const fromAccount=postObj.customerAccountNumber;
    const availBal=fromBal-parseInt(this.amount);
    console.log(fromBal,fromAccount,availBal);
    if(availBal>500){
     postObj.totalSavings=availBal;
     console.log(postObj);
    this.$.ajax._makeAjaxCall('put',`http://localhost:3000/users/${postObj.id}`,postObj,'fundTransfer'); 
    this.message="amount is sucessfully transferred";
    this.$.toast.open();
  }
    else{
      this.message="account bal. is less than INR 500";
      this.$.toast.open();
    }
  }
  _ajaxResponse(event){
    console.log(event.detail.data);
    console.log('inTransfer');
    const updatedBal=event.detail.data[0].totalSavings+parseInt(this.amount);
    event.detail.data[0].totalSavings=updatedBal;
    console.log( event.detail.data[0])
    this.$.ajax._makeAjaxCall('put',`http://localhost:3000/users/${event.detail.data[0].id}`, event.detail.data[0],'');

  }
  _handleBack(){
    this.set('route.path','/beneficiary-details');
  }
}

window.customElements.define('make-transaction', MakeTransaction);
