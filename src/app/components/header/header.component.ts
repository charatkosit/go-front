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
  user_name!: string | null;
  currentUser: string = this.share.currentUser;
  permission!: string | null;
  //------------------------

  ngOnInit(): void {


    
  }

  ngAfterViewChecked() {
    this.user_name = localStorage.getItem(environment.user_name)
    this.permission = localStorage.getItem(environment.permission)

  }

  onClickSignOut() {
    localStorage.removeItem(environment.loginResult);
    localStorage.removeItem(environment.access_token);
    localStorage.removeItem(environment.user_code);
    localStorage.removeItem(environment.user_name);
    localStorage.removeItem(environment.permission);

    this.router.navigate(["/login"])
  }




}
