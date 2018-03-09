import { AuthProvider } from '../../authen_component/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { ProfileServiceProvider } from "../profile/profile-service";
import { ProfileModel } from '../profile/profile.model';
import * as firebase from 'firebase';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraPopoverOptions, CameraOptions } from '@ionic-native/camera';

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
  images: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ProfileServiceProvider: ProfileServiceProvider,
    public loadding: LoadingController,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private crop: Crop,
    private imagePicker: ImagePicker,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUser();
  }
  getUser() {
    this.user = this.auth.user();
  }
  updateProfile() {
    this.change = false;
  }

  selectImage(from, maxImg) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Photo Gallery',
          handler: () => {
            this.galleryCamera(from, maxImg);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.openCamera(from);
          }
        }
      ]
    });
    actionSheet.present();
  }
  openCamera(from) {
    this.images = [];
    const popover: CameraPopoverOptions = {
      x: 0,
      y: 32,
      width: 320,
      height: 480,
      arrowDir: this.camera.PopoverArrowDirection.ARROW_ANY
    }
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let loading = this.loadding.create();
    this.camera.getPicture(options).then((imageData) => {
      loading.present();
      this.resizeImage(imageData).then((data) => {
        this.images.push(data);
        this.user.profileImageURL = data;
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  galleryCamera(from, maxImg) {
    this.images = [];
    const options = {
      maximumImagesCount: maxImg,
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    let loading = this.loadding.create();
    this.imagePicker.getPictures(options).then((imageData) => {
      loading.present();
      if (Array.isArray(imageData) && imageData.length > 0) {
        for (var i = 0; i < imageData.length; i++) {
          this.resizeImage(imageData[i]).then((data) => {
            this.images.push(data);
            this.user.profileImageURL = data;
            loading.dismiss();
          }, (err) => {
            loading.dismiss();
            console.log(err);
          });
        }
      } else {
        loading.dismiss();
      }
    }, (err) => {
      // alert('err');
      console.log(err);
    });

  }

  noResizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uploadImage(fileUri).then((uploadImageData) => {
        resolve(uploadImageData);
      }, (uploadImageError) => {
        reject(uploadImageError)
      });
    });
  }
  resizeImage(fileUri): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crop.crop(fileUri).then((cropData) => {
        this.uploadImage(cropData).then((uploadImageData) => {
          resolve(uploadImageData);
        }, (uploadImageError) => {
          reject(uploadImageError)
        });
      }, (cropError) => {
        reject(cropError)
      });
    });
  }
  uploadImage(imageString): Promise<any> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };
      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });
        parseUpload = imageRef.put(blob, metadata);
        parseUpload.on('state_changed', (_snapshot) => {
          let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (_snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
          (_err) => {
            reject(_err);
          },
          (success) => {
            resolve(parseUpload.snapshot.downloadURL);
          });
      }
      xhr.send();
    });
  }

  save() {
    let loadding = this.loadding.create();
    loadding.present();
    this.ProfileServiceProvider.updateProfile(this.user).then((data) => {
      this.user = data;
      console.log(data);
      this.change = true;
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
