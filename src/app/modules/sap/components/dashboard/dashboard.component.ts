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
  
  customer_code = '10008690100';
  sumINV: number = 0;
  sumCN: number = 0;
  constructor(private share: ShareService) { }

  ngOnInit(): void {

    this.sumINV = this.share.sum_INV;
    this.sumCN  = this.share.sum_CN;

    // this.sap.getSapInvoice(this.customer_code).subscribe( (res:ApiInvoice)=>{
      // const data_INV  = res.data.filter(resf => {
      //   return resf.DocType.includes('INV')
      //  })
      //  this.sumINV = data_INV.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
      //  console.log(data_INV)
      //  console.log(`sum INV is ${this.sumINV}`)



      //  const data_CN  = res.data.filter(resf => {
      //   return resf.DocType.includes('CN')
      //  })
      //  this.sumCN = data_CN.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
      //  console.log(data_CN)
      //  console.log(`sum INV is ${this.sumCN}`)



    // })



  }
}
