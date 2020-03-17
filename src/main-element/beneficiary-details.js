import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import './ajax-call.js';
import '@polymer/app-route/app-location.js';
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
      <ajax-call id="ajax"></ajax-call>
      <div id="addBeneficiary">
      <h3>Add New Beneficiary</h3>
      <paper-input id="name" placeholder="Name"></paper-input>
      <paper-input id="account" placeholder="Account No."></paper-input>
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

     </div>
    `;
  }
  static get properties() {
    return {
        transactionDetails:{
            type:Array,
            value:[{"beneficiaryName":"Lodu","beneficiaryAccountNumber":"No.1"}]
        }
    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('account-details', (e) => this._transactionDetails(e))
  }
  /** 
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback()
  {  super.connectedCallback();
    //  this.$.ajax._makeAjaxCall('get',`http://10.117.189.176:9090/forxtransfer/customers/${sessionStorage.getItem('userId')}/transactions?month=02&year=2020`,null,'accountDetails')  
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
    const beneficiaryName = this.$.beneficiaryName.value;
    const beneficiaryAccountNumber=this.$.beneficiaryAccountNumber.value;
    const {customerAccountNumber}=JSON.parse(sessionStorage.getItem('user'));
      let postObj={beneficiaryName,beneficiaryAccountNumber,customerAccountNumber}
      //  this.$.ajax._makeAjaxCall('post',`http://10.117.189.176:9090/forxtransfer/customers/login`,postObj,'login')  
      }
      _handleTransfer(){
        this.set('route.path','/make-transaction');
      }
}

window.customElements.define('beneficiary-details', BeneficiaryDetails);
