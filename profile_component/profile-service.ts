import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileModel } from "../../assets/model/profile.model";

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  getProfile(): Promise<ProfileModel> {
    return this.http.get('./profile.json')
      .toPromise()
      .then(response => response as ProfileModel)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
