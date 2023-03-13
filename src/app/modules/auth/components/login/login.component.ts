import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInvoice } from 'src/app/interfaces/ApiInvoice';
import { AuthService } from 'src/app/services/auth.service';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  loginForm!: FormGroup
  constructor(
    public share: ShareService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private sap: SapService,
    private auth: AuthService) { }
  //-----------ประกาศตัวแปร--------------------

  authUrl: string = environment.authUrl;

  //------------------------------------------


  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],

    })


    if (this.auth.isLoggedIn() == true) {
      this.router.navigate(["/content"])
    }
  }



  onClickRegister() {
    this.router.navigate(["register"])
  }


  onClickForgot() {
    this.router.navigate(["forgot"])
  }

  onSubmit() {

    const Email = this.loginForm.controls['Email'].value;
    const Password = this.loginForm.controls['Password'].value;

    const body = new URLSearchParams();
    body.set('email', Email);
    body.set('password', Password);
    console.log(`body is ${body}`)

    this.http.post('/api/v1/auth/login', body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).subscribe((res: any) => {
      const access_token = res.access_token;
      localStorage.setItem(environment.access_token, access_token)

      const temp = localStorage.getItem(environment.access_token)
      console.log(`temp is ${temp}`)


      //ดักจับ ถ้ารหัสผิด   มี2 กรณี
      //  1.ไม่มี  email นี้   404
      //  2.password ผิด    401



      // เมื่อได้รับ access_token แล้ว ให้ ไปถามว่ารายละเอียด profile และให้ แนบ access_token ด้วย
      this.http.get('/api/v1/auth/profile',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          })
        }
      ).subscribe((res: any) => {
        localStorage.setItem(environment.user_code, res.codeUserId);
        localStorage.setItem(environment.user_name, res.fullName);
        localStorage.setItem(environment.permission, res.permission);
          
        const codeUserId = localStorage.getItem(environment.user_code);

        console.log(`codeUserId is ${codeUserId}`)
        this.prepareDataDashboard(codeUserId);


        if(codeUserId !='no_assign'){
          localStorage.setItem(environment.loginResult, "ok")
          this.router.navigate(["/dashboard"])
          return
        } else {

          localStorage.setItem(environment.loginResult, "loginResult")
          this.router.navigate(["/login"])
    

        }
      });

    }) 


    // ตรวจสอบว่า เคยมี email นี้อยู่หรือไม่ 
    // ถ้ามี แจ้ง ว่าเคยมี  
    // localStorage.setItem(environment.loginResult, "ok")
    // this.router.navigate(["/dashboard"])

  }



  prepareDataDashboard(customer_code:any) {

    //---------------ประกาศตัวแปร--------------

    let sumINV: number = 0;
    let sumCN: number = this.share.sum_CN;
    let nINV: number = this.share.n_Inv;
    let nCN: number = this.share.n_CN;
 

    //----------------Get-Invoice-----------------------  
    this.sap.getSapInvoice(customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter_inv = res.data.filter(resf => {
          return resf.DocType.includes('INV')
        })


        const data_filter_cn = res.data.filter(resf => {
          return resf.DocType.includes('CN')
        })

        sumINV = data_filter_inv.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_INV = sumINV;


        sumCN = data_filter_cn.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_CN = sumCN;


        // หาจำนวน  INV ว่ามีกี่ฉบับ
        this.share.n_Inv = data_filter_inv.length;
        this.share.n_CN = data_filter_cn.length;

        //เก็บค่าที่ได้ จาก api 
        this.share.INV = data_filter_inv;
        this.share.CN = data_filter_cn;

        this.share.lastUpdate = new Date();

// --------------------
    //  localStorage.setItem(environment.sumINV,sumINV);





// ----------------------


        console.log(`sumINV is ${this.share.sum_INV}`);
        console.log(`sumCN is ${this.share.sum_CN}`);

      });

  }

}
