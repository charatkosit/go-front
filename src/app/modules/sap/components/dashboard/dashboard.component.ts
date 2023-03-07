import { Component, OnInit } from '@angular/core';
import { ApiInvoice } from 'src/app/interfaces/ApiInvoice';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private sap: SapService,
    public share: ShareService) { }

  //---------------ประกาศตัวแปร--------------
  customer_code = this.share.customer_code;
  sumINV: number = 0;
  sumCN: number = this.share.sum_CN;
  nINV: number = this.share.n_Inv;
  nCN: number = this.share.n_CN;
  //----------------------------------------


  ngOnInit(): void {

  console.log(`customer_code is ${this.customer_code}`)
  //----------------Get-Invoice-----------------------  
    this.sap.getSapInvoice(this.customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter_inv = res.data.filter(resf => {
          return resf.DocType.includes('INV')
        })


        const data_filter_cn = res.data.filter(resf => {
          return resf.DocType.includes('CN')
        })

        this.sumINV = data_filter_inv.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_INV = this.sumINV;


        this.sumCN = data_filter_cn.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_CN = this.sumCN;


        // หาจำนวน  INV ว่ามีกี่ฉบับ
        this.share.n_Inv =  data_filter_inv.length; 
        this.share.n_CN =  data_filter_cn.length;
        
        //เก็บค่าที่ได้ จาก api 
        this.share.INV   = data_filter_inv;
        this.share.CN   = data_filter_cn;

        this.share.lastUpdate = new Date();
      
      });

  //---------------------------------------

  }




}
