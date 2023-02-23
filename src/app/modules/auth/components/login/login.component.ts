import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword:boolean = false;
  loginForm!: FormGroup
  constructor(
   private fb:FormBuilder,
   private router: Router,
   private http: HttpClient,
   private auth: AuthService) { }
 
 
  
   ngOnInit() {
     this.loginForm = this.fb.group({
       Email: ['',[Validators.required,Validators.email]],
       Password: ['',Validators.required],
     
     })
 
 
     if (this.auth.isLoggedIn() == true) {
       this.router.navigate(["/content"])
     }
   }
 
 
  
   onClickRegister() {
     this.router.navigate(["register"])
   }
 
 
   onClickForgot() {
    this.router.navigate(["forgot"])
  }

   onSubmit(value:any ) {
     console.log(`value is ${value}`)
     const formData = new FormData();
     formData.append('email', value.email);
     formData.append('password', value.password);
      
    this.http.post('http://127.0.0.1:3000/api/v1/auth/login',formData, { 
       headers: new HttpHeaders({ 
        'Content-Type': 'application/x-www-form-urlencoded'
       })
    }).subscribe( res => {
      console.log(res)
    })

   // ตรวจสอบว่า เคยมี email นี้อยู่หรือไม่ 
   // ถ้ามี แจ้ง ว่าเคยมี  
   localStorage.setItem(environment.loginResult, "ok")
   this.router.navigate(["/dashboard"])
   }
}
