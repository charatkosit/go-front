import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public share: ShareService) { }

// --------ประกาศตัวแปร-------------
  user:string = '';
  isAdmin:boolean = false;
//---------------------------------
  ngOnInit(): void {
    this.user = environment.user;
    this.getStatusAdmin();
   
  }

   getStatusAdmin(){

    if(this.share.currentUser==='admin'){
      this.isAdmin =  true;
    }else {
      this.isAdmin = false;
    }
    
    
  }

}
