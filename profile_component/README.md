1. copy profile ไป ที่ project ในส่วน pages

2. เรียกใช้ HttpClientModule
- ไปที่ app.module => imports เพื่อเรียกใช้ HttpClientModule
import { HttpClientModule, HttpClient } from '@angular/common/http';

3. เรียกใช้ Profileservice
- ไปที่ app.module => providers: เพื่อเรียกใช้ ProfileProvider
import { ProfileServiceProvider } from '../pages/profile/profile-service';

4. copy profile.json to assets/json เพื่อให้ Service เรียกใช้ JSON