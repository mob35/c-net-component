import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthProvider {
  public url: string = 'https://ic-pos-service-dev.herokuapp.com/';
  jwt: JwtHelper = new JwtHelper();
  constructor(
    private http: HttpClient
  ) {

  }

  authenticated() {
    return tokenNotExpired();
  }

  user() {
    if (this.authenticated()) {
      return this.jwt.decodeToken(window.localStorage.getItem('token'))
    } else {
      return null;
    }
  }

  login(credentials) {
    return this.http.post(this.url + 'api/auth/signin', credentials)
      .toPromise()
      .then(response => this.loginSuccess(response))
      .catch(err => this.handleError(err));
  }

  signup(credential) {
    return this.http.post(this.url + 'api/auth/signup', credential)
      .toPromise()
      .then(response => this.registerSuccess(response))
      .catch(err => this.handleError(err));
  }

  logout() {
    window.localStorage.removeItem('token');
  }

  private loginSuccess(res) {
    window.localStorage.setItem('token', res.loginToken);
    return res;
  }

  private registerSuccess(res) {
    window.localStorage.setItem('token', res.loginToken);
    return res;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error || error);
  }

}