import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,
              ) { }





  isLoggedIn() {
    let loginResult = localStorage.getItem(environment.loginResult);
    let customerCodeResult = localStorage.getItem(environment.user_code);

    return (loginResult != null && loginResult == 'ok' && customerCodeResult != '');
  }


  login(usernamePassword: string) {
    return this.http.post<any>(environment.authUrl, usernamePassword,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
  }

  register(usernamePassword: string) {
    // return this.http.post<any>(this.registerUrl, usernamePassword, {headers: this.headers})
    return usernamePassword
  }
}
