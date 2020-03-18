import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './ajax-call.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class TransactionDetails extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        table
        {
          border-collapse: collapse;
            width: 100%;
            margin-top:5px;
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
                     color:black;
                     font-weight: bolder;
                     text-align: left;
                     background-color:skyblue;
                   }
                   #back{
                     background:grey;
                     color:white;
                   }
      </style>
      <div >
      <paper-button id="back" on-click="_handleBack">Back</paper-button>
     <table>
              <th>Name</th>
              <th>Account No.</th>
              <th>Amount</th>
      <tbody>
          <template is="dom-repeat" items={{transactionDetails}}>
              <tr>
                  <td>{{item.beneficiaryName}}</td>
                  <td>{{item.beneficiaryAccountNumber}}</td>
                  <td>{{item.amount}}</td>
              </tr>
          </template>
      </tbody>
  </table>
     </div>
     <ajax-call id="ajax"></ajax-call>
     <app-location route={{route}}></app-location>
    `;
  }
  static get properties() {
    return {

    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('ajax-response', (e) => this._transactionDetails(e))
  }
  /** 
   * call the API to fetch the data to render it on the screen
   */
  connectedCallback()
  {  super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://localhost:3000/transactions`,null,'ajaxResponse')  
  }
  //populating data in dom repeat for account details
  _transactionDetails(event){  
    console.log(event.detail.data)
    // if(event.detail.data.status==500)
    // {
    //   this.$.noTransaction.innerHTML=event.detail.data.message
    // }
    // else
    // {
    // this.transactionDetails=event.detail.data
    // }
    this.transactionDetails=event.detail.data;
}
_handleBack(){
  this.set('route.path','/user-home');
}
}

window.customElements.define('transaction-details', TransactionDetails);
