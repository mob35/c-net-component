1 เรียกใช้ HttpClientModule
- ไปที่ app.module => imports เพื่อเรียกใช้ HttpClientModule
import { HttpClientModule, HttpClient } from '@angular/common/http';

2 เรียกใช้ Profileservice
- ไปที่ app.module => providers: เพื่อเรียกใช้ ProfileProvider
import { ProfileServiceProvider } from '../pages/profile/profile-service';

3 copy profile.json to assets/json เพื่อให้ Service เรียกใช้ JSON