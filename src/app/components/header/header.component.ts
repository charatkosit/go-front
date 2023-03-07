import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    public share: ShareService,
    public auth: AuthService) { }

  //-----ประกาศตัวแปร--------  
  project: string = '';
  sapUrl: string = '';
  release: string = '';
  user: string = '';
  currentUser: string = this.share.currentUser;
  //------------------------

  ngOnInit(): void {
    this.project = environment.project;
    this.sapUrl = environment.sapUrl;
    this.release = environment.release;
    this.user = environment.user;
  }


  onClickSignOut() {
    localStorage.removeItem(environment.loginResult)
    this.router.navigate(["/login"])
  }




}
