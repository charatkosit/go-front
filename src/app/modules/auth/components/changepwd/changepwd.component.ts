import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  changepwdForm!: FormGroup
  passwordsMatching: boolean = false;
  isConfirmPasswordDirty: boolean = false;
  confirmPasswordClass: string = 'form-control' 


  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    // แบบใหม่
    this.changepwdForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(20)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      renewPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
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


  onSubmit(value: any) {
    console.log(value)
  }
}
