import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private credencial: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public loadding: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {

  }

  login() {
    console.log(this.credencial);
    let loadding = this.loadding.create();
    loadding.present();
    this.auth.login(this.credencial).then(data => {
      console.log(data);
      loadding.dismiss();
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: 'เข้าสู่ระบบเรียบร้อยแล้ว',
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
      // alert(err)
      loadding.dismiss();
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: JSON.parse(err._body).message,
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
