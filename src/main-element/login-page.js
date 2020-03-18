import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import './ajax-call.js';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      height:80.8vh;
      overflow-y:hidden;
      background-size:cover;
    }
    img{
      margin-top:20px;
      margin-bottom: 0;
      width:150px;
      height:50px
    }
    paper-button{
      background-color: darkblue;
      color: whitesmoke;
    }
    #form
    {
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      width:40%;
      margin:70px auto;
      padding:15px;
      box-shadow:0px 0px 5px 5px;
    }
    span{
      display:flex;
      margin-top: 10px;
      justify-content: center;
    }
  </style>
  <app-location route={{route}}></app-location>
  <paper-toast text={{message}} id="toast"></paper-toast>
  <ajax-call id="ajax"></ajax-call>
  <iron-form id="form">
  <form>
  <paper-input id="accountNumber" auto required allowed-pattern=[0-9] minlength="2" maxlength="8" label="Enter Account Number"></paper-input>
  <paper-input id="password" auto  required type="password" label="Password"></paper-input>
  <span>
  <paper-button on-click="_signIn" raised id="loginBtn">LogIn</paper-button></span>
  </form>
  </iron-form>
    `;
  }
  static get properties() {
    return {
      message:{
        type:String,
        value:''
      }
    };
  }
  /**
   * listening customEvents sent from child elements
   */
  ready()
  {
    super.ready();
    this.addEventListener('ajax-response', (e) => this._ajaxResponse(e))
  }
  /**
   * 
   * @param {mouseEvent} event on SignIn click event is fired
   * validate if mobile No. has 10 digits or not
   * get the user details from the database
   */
  _signIn(){
    if(this.$.form.validate()){
  const accountNumber = this.$.accountNumber.value;
  const password=this.$.password.value;
    let postObj={accountNumber,password}
   this.$.ajax._makeAjaxCall('get',`http://localhost:3000/users?customerAccountNumber=${accountNumber}&&password=${password}`,null,'ajaxResponse')  
  } 
  else{
    this.message='Enter Valid Credential'
    this.$.toast.open();
  }
}
  /**
   * 
   * @param {*} event 
   * handles the response sent by the database
   * transfer the user on the base of role as customer or staff to respective page
   */
  _ajaxResponse(event)
  {
    const data=event.detail.data[0];
      this.message=`${data.message}`
      this.$.toast.open();
      if(event.detail.data.statusCode!=404){
      sessionStorage.setItem('isLogin',true);
      this.dispatchEvent(new CustomEvent('LoggedIn-Nav',{bubbles:true,composed:true}))
      sessionStorage.setItem('user',JSON.stringify(data));
      // sessionStorage.setItem('userName',event.detail.data.customerName);
      this.set('route.path','/user-home');
  }}
}

window.customElements.define('login-page', LoginPage);