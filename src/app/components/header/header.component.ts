import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  project:string ='';
  sapUrl:string = '';
  release:string = '';
 constructor(private router:Router, public auth:AuthService) { }

 ngOnInit(): void {
    this.project = environment.project;
    this.sapUrl = environment.sapUrl;
    this.release = environment.release;
 }


 onClickSignOut(){
   localStorage.removeItem(environment.loginResult)
   this.router.navigate(["/login"])
 }

}
