import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

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
      </style>
      <div>
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
}

window.customElements.define('transaction-details', TransactionDetails);
