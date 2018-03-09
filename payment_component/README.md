** part 1 จ่ายเงินแบบบัตรเครดิต

** part 2 จ่ายเงินแบบ internetbanking

////// Part 1 :: payment Credit card ///////////

1. copy folder payment ไปใส่ใน project ในส่วนของ pages

2. copy folder omise ไปใส่ในส่วน providers

3. import OmiseProvider ไปใส่ app.module ในส่วนของ providers

providers:[
  OmiseProvider
]

4. ติดตั้ง Omise
- npm install omise --save

5. แก้ไข version ใน package.json
จาก 
- "omise": "^0.5.4"
เป็น
- "omise": "0.5.3"

npm install อีกครั้ง

6. import HttpClientModule ที่ app.module
- import { HttpClientModule, HttpClient } from '@angular/common/http';
- imports: [
    HttpClientModule
  ]
  
7. สมัคร omise จะได้ key test มา
- https://www.omise.co/

(ถ้ามี key แล้วให้ข้ามข้อนี้ครับ)

8. ไปที่ node_modules > omise > lib > apiResources.
ใช้ source code
- function resourceName(name) { return require('./resources/'+name)(omiseConfig); }

วางแทนที่ 
- function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}


/////// Part 2 :: payment internet banking ///////

1. copy folder banking ไปที่ pages

2. copy folder imgs ไปไว้ที่ assest

3. เปิด folder omiseNodemodule copy folder omise ที่อยู่ข้างใน ไปทับใน nodemodule

4. install inappbrowser
 - ionic cordova plugin add cordova-plugin-inappbrowser
 - npm install --save @ionic-native/in-app-browser

5. import InAppBrowser ไปไว้ใน app.module

import { InAppBrowser } from '@ionic-native/in-app-browser';

providers: [
  InAppBrowser
]