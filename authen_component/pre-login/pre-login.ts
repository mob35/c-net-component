import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-login',
  templateUrl: 'pre-login.html',
})
export class PreLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  gotoLogin() {
    this.navCtrl.push('LoginPage');
  }

  gotoRegister() {
    this.navCtrl.push('RegisterPage');
  }

}
