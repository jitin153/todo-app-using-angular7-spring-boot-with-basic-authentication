import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../app.constants';

export const AUTH_TOKEN='authToken';
export const AUTH_USER='authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeBasicAuthService(username, password) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBO>(`${BASE_URL}/basicauth`, { headers })
      //--pipe() method allows us to declare what should be done if the request succeds or if the request fails.
      .pipe(
        map(
          response => {
            sessionStorage.setItem(AUTH_USER, username);
            sessionStorage.setItem(AUTH_TOKEN, basicAuthHeaderString);
            return response;
          }
        )
      );
  }

  getAuthUser() {
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthToken() {
    if (this.getAuthUser()) {
      return sessionStorage.getItem(AUTH_TOKEN);
    }
  }

  isLoggedIn() {
    let user = sessionStorage.getItem(AUTH_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(AUTH_TOKEN);
  }
}

export class AuthenticationBO {
  constructor(public message: string) { }
}