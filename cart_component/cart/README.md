1. copy cart to your project in folder pages

2. เรียกใช้ HttpClientModule
- ไปที่ app.module => imports เพื่อเรียกใช้ HttpClientModule
import { HttpClientModule, HttpClient } from '@angular/common/http';
imports:[
    HttpClientModule
]

3. เรียกใช้ CartProvider
- ไปที่ app.module => providers เพื่อเรียกใช้ CartProvider
import { CartProvider } from '../providers/cart/cart';
providers:[
    CartProvider
]

4. copy cart.json to assets/json เพื่อให้ Service เรียกใช้ JSON

5. gen component preload-image 

5. copy file ใน folder preload-image components to your project in folder components/preload-image ที่ gen มาใหม่

6. เช็ค components.module.ts ใน folder components 

import { NgModule } from '@angular/core';
import { PreloadImageComponent } from './preload-image/preload-image';
@NgModule({
	declarations: [PreloadImageComponent],
	imports: [],
	exports: [PreloadImageComponent]
})
export class ComponentsModule {}

ถ้า ในส่วน imports ไม่มี IonicModule ให้ใส่ IonicModule เข้าไป

import { NgModule } from '@angular/core';
import { PreloadImageComponent } from './preload-image/preload-image';
import { IonicModule } from 'ionic-angular/module';
@NgModule({
	declarations: [PreloadImageComponent],
	imports: [IonicModule],
	exports: [PreloadImageComponent]
})
export class ComponentsModule {}

7. เรียกใช้ ComponentsModule
- ไปที่ cart.module => imports เพื่อเรียกใช้ ComponentsModule ให้ component preloadimage ใช้งานได้
import { ComponentsModule } from '../../components/components.module';

 - cart.module.ts
 imports:[
     ComponentsModule
 ]