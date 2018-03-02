1 เรียกใช้ HttpClientModule
- ไปที่ app.module => imports เพื่อเรียกใช้ HttpClientModule
import { HttpClientModule, HttpClient } from '@angular/common/http';

2 เรียกใช้ CartProvider
- ไปที่ app.module => providers เพื่อเรียกใช้ CartProvider
import { CartProvider } from '../providers/cart/cart';

3. copy cart.json to assets/json เพื่อให้ Service เรียกใช้ JSON

4. copy preloadimage components to your project

5. เรียกใช้ ComponentsModule
- ไปที่ cart.module => imports เพื่อเรียกใช้ ComponentsModule
import { ComponentsModule } from '../../components/components.module';