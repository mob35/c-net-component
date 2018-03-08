import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
user :ProfileModel = new ProfileModel();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public ProfileServiceProvider: ProfileServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
  }
  getUser() {
    this.ProfileServiceProvider.getProfile().then((data) => {
      this.user = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

}
