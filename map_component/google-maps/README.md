1. copy folder google-maps and address-detail to your project folder pages

2. install google map with key google map api
https://ionicframework.com/docs/native/google-maps/

- ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyBPahPmnmB7R-TWeGz-kBBlDG3PnWMeIjs" --variable API_KEY_FOR_IOS="AIzaSyBPahPmnmB7R-TWeGz-kBBlDG3PnWMeIjs"

- npm install --save @ionic-native/google-maps


**key for test : AIzaSyBPahPmnmB7R-TWeGz-kBBlDG3PnWMeIjs

3. install native geocoder
https://ionicframework.com/docs/native/native-geocoder/

- ionic cordova plugin add cordova-plugin-nativegeocoder

- npm install --save @ionic-native/native-geocoder

4. import class google map and geocoder to provider in app.module.ts 
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
 providers:[
     GoogleMaps,
     NativeGeocoder
 ]

5. inject script to index.html
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBPahPmnmB7R-TWeGz-kBBlDG3PnWMeIjs&libraries=places"></script>

6. copy address-detail Page to your project for edit data address detail 

7. enjoy.