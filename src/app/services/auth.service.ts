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
    return (loginResult != null && loginResult == 'ok');
  }


  login(usernamePassword: string) {
    return this.http.post<any>(environment.loginUrl, usernamePassword,
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
