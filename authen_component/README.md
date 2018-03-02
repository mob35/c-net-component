## วิธีใช้งาน auth_component
### auther dookdik

1. Copy folder pre-login, login, register ไปไว้ใน folder pages ในโปรเจ็คของเรา
2. import class นี้ไว้ที่ app.module.ts
```
import { PreLoginPage } from '../pages/pre-login/pre-login';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


declarations: [
    PreLoginPage,
    LoginPage,
    RegisterPage
]

entryComponents: [
    PreLoginPage,
    LoginPage,
    RegisterPage
  ]

``` 

3. นำ folder auth ไปใส่ไว้ใน providers ของโปรเจ็คเรา
4. ติดตั้งแพคเกจของ NodeJs ชื่อ angular2-jwt ใช้เช็ค Token Expire
``` 
npm i angular2-jwt --save
``` 
5. import class ของ provider ไว้ใน app.module.ts

``` 
import { AuthProvider } from '../providers/auth/auth';

providers: [
    AuthProvider
  ]
``` 
6. HttpClientModule ไว้ใน app.module.ts
``` 
import { HttpClientModule } from '@angular/common/http';

imports: [
    HttpClientModule
  ]
``` 
7. Enjoy !