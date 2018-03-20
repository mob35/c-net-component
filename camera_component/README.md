(1) สร้างที่เว็บ
- ไปที่ https://firebase.google.com/ 
- เพิ่มโครงการ
- Go to Tabs Storage => rule (กฏ) เปลี่ยนจาก allow read, write: if request.auth != null; เป็น allow read, write: if request.auth == null;
- กด Publish (เผยแพร่)

(2) ทำที่แอป
- ติดตั้ง Camera
- ionic cordova plugin add cordova-plugin-camera --save
- npm install --save @ionic-native/camera

- ติดตั้ง Crop
- ionic cordova plugin add cordova-plugin-crop --save
- npm install --save @ionic-native/crop
- ใช้เป็น version "crop": "4.5.2" แล้วทำการ npm update (เอาหมวกออก)

- ติดตั้ง Base64
- ionic cordova plugin add com-badrit-base64 --save
- npm install --save @ionic-native/base64

- ติดตั้ง ImagePicker
- ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="your usage message" --save
- npm install --save @ionic-native/image-picker

- ติดตั้ง Firebase
- npm install firebase --save 
- ใช้เป็น version "firebase": "4.8.0" แล้วทำการ npm update

- ติดตั้ง Image Picker
- ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION="your usage message" --save
- npm install --save @ionic-native/image-picker

- เรียกใช้ Camera,
        Crop,
        ImagePicker,
        Base64
- ไปที่ app.module => providers เพื่อเรียกใช้ Camera, Crop, ImagePicker, Base64,
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';

- ไปที่ app.component เพื่อตั้งค่า Firebase
- import * as firebase from 'firebase';
- ใน constructor(){
    platform.ready().then(() => {
      this.configFirebase();
    }
}

- Function ที่โดนเรียกใช้
configFirebase() {
    let config = {
      apiKey: "AIzaSyAyRjO7AgZvbZgTjmAjCO7Gdj_q8GNb74U",
      authDomain: "camera-firebase-console.firebaseapp.com",
      databaseURL: "https://camera-firebase-console.firebaseio.com",
      projectId: "camera-firebase-console",
      storageBucket: "camera-firebase-console.appspot.com",
      messagingSenderId: "274599816221"
    };
    firebase.initializeApp(config);
  }

*** ตัวแปร config ทั้งหมดได้มาจากเว็บ https://firebase.google.com/ ที่ไปสร้างโครงการที่สร้างไว้ในขั้นตอนแรก Tabs Project Overview => Firebase สำหรับเว็บแอป

