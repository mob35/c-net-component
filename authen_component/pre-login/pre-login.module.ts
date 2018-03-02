import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreLoginPage } from './pre-login';

@NgModule({
  declarations: [
    PreLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(PreLoginPage),
  ],
})
export class PreLoginPageModule {}
