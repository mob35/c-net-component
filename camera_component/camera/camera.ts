import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  images: Array<any> = [];
  imageForm: string = './assets/imgs/icon.png';
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private crop: Crop,
    private imagePicker: ImagePicker,
    private loading: LoadingController
  ) {
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
      // popoverOptions: popover,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    let loading = this.loading.create();
    this.camera.getPicture(options).then((imageData) => {
      loading.present();
      this.resizeImage(imageData).then((data) => {
        this.images.push(data);
        loading.dismiss();
        this.updateImage();
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
    let loading = this.loading.create();
    this.imagePicker.getPictures(options).then((imageData) => {
      loading.present();
      if (Array.isArray(imageData) && imageData.length > 0) {
        for (var i = 0; i < imageData.length; i++) {
          this.resizeImage(imageData[i]).then((data) => {
            this.images.push(data);
            loading.dismiss();
            this.updateImage();
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
  updateImage() {
    this.imageForm = this.images && this.images.length > 0 ? this.images[this.images.length - 1] : '';
  }

}
