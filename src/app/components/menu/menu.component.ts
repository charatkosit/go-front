import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user:string = '';

  constructor(public share: ShareService) { }

  ngOnInit(): void {
    this.user = environment.user;
   
   
  }

}
