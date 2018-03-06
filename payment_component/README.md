 *ติดตั้ง Omise
- npm install omise --save


สมัคร omise จะได้ key test มา
- https://www.omise.co/


*ไปที่ node_modules > omise > lib > apiResources.
ใช้ source code
- function resourceName(name) { return require('./resources/'+name)(omiseConfig); }

วางแทนที่ 
- function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}


*แก้ไข version ใน package.json
จาก 
- "omise": "^0.5.4"
เป็น
- "omise": "0.5.3"
