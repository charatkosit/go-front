import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  passwordsMatching: boolean = false;
  isConfirmPasswordDirty: boolean = false;
  passwordClass: string = 'form-control'
  confirmPasswordClass: string = 'form-control';
  showPassword: boolean = false;
  showRePassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private auth: AuthService) { }

  isError = false;


;



  ngOnInit() {

    // แบบเก่า
    // this.FormRegister = this.fb.group({
    //   EmailAddress: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    //   Password: new FormControl('',Validators.required),
    //   RePassword: new FormControl('',Validators.required)
    // })

    // แบบใหม่
    this.registerForm = this.fb.group({
      // Username: ['',[Validators.required,Validators.min(3),Validators.maxLength(20)]],
      Email: ['',[Validators.required,Validators.email,Validators.maxLength(25)]],
      Password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      RePassword:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
    })
  }


onSubmit(value:any ) {
  console.log(value)
// ตรวจสอบว่า เคยมี email นี้อยู่หรือไม่ 
// ถ้ามี แจ้ง ว่าเคยมี  
this.router.navigate(["/login"])
}


checkPasswords(pw: string, cpw: string) {
  this.isConfirmPasswordDirty = true;
  if (pw === cpw) {
    this.passwordsMatching = true;
    this.confirmPasswordClass = 'form-control is-valid';
  } else {
    this.passwordsMatching = false;
    this.confirmPasswordClass = 'form-control is-invalid'
  }
}


checkIsEmail(email:string){
  
}




  onClickCancel() {
    this.location.back();
  }
}
