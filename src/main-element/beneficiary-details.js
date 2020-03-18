import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import './ajax-call.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';

/**
 * @customElement
 * @polymer
 */
class BeneficiaryDetails extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #addBeneficiary{
            width:50%;
            margin:auto;
         
        }
        #addBtn{
            display:flex;
            align-items:center;
            background:skyblue;
        }
        table
        {
          border-collapse: collapse;
            width: 100%;
        }
            th, td {
                      padding: 10px; 
                   }
                   tr
                   {
                     font-weight: bolder;
                   }
                   
                   tr:nth-child(even) 
                   {
                     background-color: #f2f2f2;
                   }
                   th
                   {
                     color:white;
                     font-weight: bolder;
                     text-align: left;
                     background-color:gray;
                   }
                   #btn{
                       font-weight:lighter;
                   }
                   #bentable{
                       margin-top:10px;
                   }
      </style>
      <paper-button id="back" on-click="_handleBack">Back</paper-button>
      <ajax-call id="ajax"></ajax-call>
      <div id="addBeneficiary">
      <h3>Add New Beneficiary</h3>
      <paper-input id="name" required allowed-pattern=[a-zA-Z] placeholder="Name"></paper-input>
      <paper-input id="account" required allowed-pattern=[0-9] placeholder="Account No."></paper-input>
      <span><paper-button raised id="addBtn" on-click=_handleAdd>Add Beneficiary</paper-button></span>
      </div>
      <app-location route={{route}}></app-location>
     <div id="bentable">
     <table>
              <th>Name</th>
              <th>Account No.</th>
              <th>Send Money</th>
      <tbody>
          <template is="dom-repeat" items={{transactionDetails}}>
              <tr>
                  <td>{{item.beneficiaryName}}</td>
                  <td>{{item.beneficiaryAccountNumber}}</td>
                  <td><paper-button raised id="btn" on-click=_handleTransfer>Send Money</paper-button></td>
              </tr>
          </template>
      </tbody>
  </table>
<paper-toast id="toast" text={{message}}></paper-toast>
     </div>
    `;
  }
  static get properties() {
    return {
        transactionDetails:{
            type:Array,
            value:[{"beneficiaryName":"Amit","beneficiaryAccountNumber":"123"}]
        }
    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('beneficiary-details', (e) => this._beneficiaryDetails(e))
    this.addEventListener('ajax-response', (e) => this._ajaxResponse(e))
  }
  /** 
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback()
  {  super.connectedCallback();
    const {customerAccountNumber}=JSON.parse(sessionStorage.getItem('user'));
    this.customerAccountNumber=customerAccountNumber;
    this.$.ajax._makeAjaxCall('get',`http://localhost:3000/beneficiary?customerAccountNumber=${customerAccountNumber}`,null,'ajaxResponse')  
  }
  //populating data in dom repeat for account details
  _transactionDetails(event){  
    console.log(event.detail.data)
    if(event.detail.data.status==500)
    {
      this.$.noTransaction.innerHTML=event.detail.data.message
    }
    else
    {
    this.transactionDetails=event.detail.data
    }
}
_handleAdd(){
    const beneficiaryName = this.$.name.value;
    const beneficiaryAccountNumber=this.$.account.value;
      let postObj={beneficiaryName,beneficiaryAccountNumber,customerAccountNumber:this.customerAccountNumber}
      console.log(postObj);
     this.$.ajax._makeAjaxCall('post',`http://localhost:3000/beneficiary`,postObj,'beneficiaryDetails')  
    this.message="added Successfully";
    this.$.toast.open();
    }
      _handleTransfer(event){
        sessionStorage.setItem('account',event.model.item.beneficiaryAccountNumber);
        this.set('route.path','/make-transaction');
      }
      _ajaxResponse(event){
        console.log(event.detail.data);
       this.transactionDetails=event.detail.data;
      }
      _handleBack(){
        this.set('route.path','/user-home');
      }
}

window.customElements.define('beneficiary-details', BeneficiaryDetails);
