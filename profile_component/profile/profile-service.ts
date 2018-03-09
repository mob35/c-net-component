import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileModel } from "../../assets/model/profile.model";

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileServiceProvider {
  public url: string = 'https://ic-pos-service-dev.herokuapp.com/';
  constructor(public http: HttpClient) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  getProfile(): Promise<ProfileModel> {
    return this.http.get('./assets/json/profile.json')
      .toPromise()
      .then(response => response as ProfileModel)
      .catch(this.handleError);
  }

  updateProfile(user): Promise<ProfileModel> {
    let token = JSON.parse(window.localStorage.getItem('token'));
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put(this.url + '/api/users', user, { headers: headers })
      .toPromise()
      .then(response => response as ProfileModel)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
