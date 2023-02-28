import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 
  memberlist: any[] =[]; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

     this.http.get('api/v1/auth/users').subscribe( (res:any) =>{
      console.log(res)
      this.memberlist = res;
     })

  }

  onDelete() {

  }

  onEdit() {
    
  }
}
