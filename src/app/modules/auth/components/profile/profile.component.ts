import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup; 
  positionItems:string[] = ['test','system','mgnt']


  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openModal(){
    // console.log(template)
  }

  onSubmit(){}

  onConvertImage(inputFile:any){
    console.log(inputFile)
  }

  onClickToChangPassword(){
    this.router.navigate(["/changepwd"])
  }
}
