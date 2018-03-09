import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfileServiceProvider } from "../profile/profile-service";
import { ProfileModel } from '../profile/profile.model';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: ProfileModel = new ProfileModel();
  change: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ProfileServiceProvider: ProfileServiceProvider,
    public loadding: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
  }
  getUser() {
    let loadding = this.loadding.create();
    loadding.present();
    this.ProfileServiceProvider.getProfile().then((data) => {
      this.user = data;
      loadding.dismiss();
    }, (err) => {
      console.log(err);
      loadding.dismiss();
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: 'ไม่พบรายละเอียดผู้ใช้',
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
  updateProfile() {
    this.change = false;
  }

  save() {
    let loadding = this.loadding.create();
    loadding.present();
    this.ProfileServiceProvider.updateProfile(this.user).then((data) => {
      this.user = data;
      console.log(data);
      loadding.dismiss();
      let alert = this.alertCtrl.create({
        title: 'แจ้งเตือน',
        message: 'แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว',
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
    }, (err) => {
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
      console.log(err);
    });
  }
}
