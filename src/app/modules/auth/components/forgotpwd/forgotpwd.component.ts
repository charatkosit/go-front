import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  FormData!: FormGroup; 
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      EmailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.maxLength(25)]))
    })
  }

  onSubmit(value:string){
    console.log(value)
//ตรวจสอบว่า  มี  email นี้ใน database หรือไม่


  }

}
