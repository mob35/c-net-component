import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private credencial: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {

  }

  login() {
    console.log(this.credencial);
    // this.auth.login(this.credencial).then(data => {
    //   console.log(data);
    // }).catch(err => {
    //   alert(err)
    // });
  }

}
