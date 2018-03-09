import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private credencial: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public loadding: LoadingController,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {

  }

  register() {
    let loadding = this.loadding.create();
    loadding.present();
    console.log(this.credencial);
    this.auth.signup(this.credencial).then(data => {
      loadding.dismiss();
      console.log(data);
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: 'สมัครสมาชิกสำเร็จแล้ว',
        mode: 'ios',
        buttons: [
          {
            text: 'ตกลง',
            handler: () => {
              // do someting
            }
          }
        ]
      });
      alert.present();
    }).catch(err => {
      loadding.dismiss();
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: err.message,
        mode: 'ios',
        buttons: [
          {
            text: 'ตกลง',
            handler: () => {
              // do someting
            }
          }
        ]
      });
      alert.present();
    });
  }

}
