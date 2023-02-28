import { HttpClient } from '@angular/common/http';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInvoice, Invoice } from 'src/app/interfaces/ApiInvoice';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';
// import * as $ from 'jquery';
// import 'datatables.net';
declare var $: any;

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  customer_code = environment.user_code;
  sumInv: number = 0;
  data: boolean = false;

  constructor(private sap: SapService,
    private router: Router,
    private share: ShareService) { }

  ngOnInit() {

    this.sap.getSapInvoice(this.customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter = res.data.filter(resf => {
          return resf.DocType.includes('INV')
        })
        this.sumInv = data_filter.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_INV = this.sumInv;
        this.data = true;

        // console.log(data_filter)
        console.log(`sum INV is ${this.sumInv}`)

        $('#example1').DataTable({
          stateSave: true,
          data: data_filter,


          columns: [
            { data: 'DocType' },
            { data: 'TaxDate' },
            { data: 'FullTaxNumber' },

            { data: 'ShipToName' },
            {
              data: 'DocTotal',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            },
            {  
              "data": null,
              "render": function (data: any, type: any, row: { id: string; }) {
                const path ='/invoice-details'
                return `<a routerLink="${path}" class="nav-link">Details</a>`
                // return `<a href="/invoice-details/${data.FullTaxNumber}" class="nav-link"> Details </a> `
                // return '<a routerLink="/invoice-details/' + row.id + '">' + data + '</a>';
                // return '<a href="/invoice-details" class="nav-link">'+ 'Details' + '</a>'
                // return '<a routerLink="/invoice-details" class="nav-link">'+ 'Details' + '</a>'
                // return '<a href="http://example.com/user/' + row.id + '">' + data + '</a>';
            }    
            },
          ]


        });

      });

  }


  onClickDetails(){
     console.log("click Details")
  }

}
