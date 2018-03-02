import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private credencial: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {

  }

  register() {
    console.log(this.credencial);
    // this.auth.signup(this.credencial).then(data => {
    //   console.log(data);
    // }).catch(err => {
    //   alert(err)
    // });
  }

}
