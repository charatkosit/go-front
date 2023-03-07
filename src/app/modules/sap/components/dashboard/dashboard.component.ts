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
  
  customer_code = this.share.customer_code;
  sumINV: number =  this.share.sum_INV;
  sumCN: number =  this.share.sum_CN;
  constructor(
         private sap : SapService,
         public share: ShareService) { }

  ngOnInit(): void {
  
    if (this.sumINV == 0 ) {
       this.fetchInvoiceCN();

    }else {
      this.sumINV = this.share.sum_INV;
      this.sumCN  = this.share.sum_CN;
    }


  }

  
  fetchInvoiceCN(){

    this.sap.getSapInvoice(this.customer_code).subscribe( (res:ApiInvoice)=>{
      const data_INV  = res.data.filter(resf => {
        return resf.DocType.includes('INV')
       })
       this.share.sum_INV = data_INV.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
       console.log(data_INV)
       console.log(`sum INV is ${this.share.sum_INV}`)



       const data_CN  = res.data.filter(resf => {
        return resf.DocType.includes('CN')
       })
       this.share.sum_CN = data_CN.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
       console.log(data_CN)
       console.log(`sum INV is ${this.share.sum_CN}`)
    })
  }
  
}
