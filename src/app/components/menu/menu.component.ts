import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  user_name: string | null = '';
  permission: string | null = '';
  isAdmin: boolean = false;
  //---------------------------------
  ngOnInit(): void {
  }


  ngAfterViewChecked() {
    this.user_name = localStorage.getItem(environment.user_name);
    this.getStatusAdmin();
  }

  getStatusAdmin() {
    this.permission = localStorage.getItem(environment.permission);

    if (this.permission === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }


  }

}
