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

5. copy preloadimage components to your project in folder components

6. เรียกใช้ ComponentsModule
- ไปที่ cart.module => imports เพื่อเรียกใช้ ComponentsModule
import { ComponentsModule } from '../../components/components.module';