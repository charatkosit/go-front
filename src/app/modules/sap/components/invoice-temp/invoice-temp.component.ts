import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ApiInvoice, Invoice } from 'src/app/interfaces/ApiInvoice';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-invoice-temp',
  templateUrl: './invoice-temp.component.html',
  styleUrls: ['./invoice-temp.component.css']
})
export class InvoiceTempComponent implements OnInit {

  customer_code = environment.user_code;
  invoice: Invoice[] = [];

  sumInv: number = 0;
  isdata: boolean = false;



  constructor(private sap: SapService,
    private router: Router,
    public share: ShareService) {

  }

  ngOnInit() {



    this.sap.getSapInvoice(this.customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter = res.data.filter(resf => {
          return resf.DocType.includes('INV')
        })
        this.sumInv = data_filter.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_INV = this.sumInv;
        this.isdata = true;
        $(document).ready(() => {
          var table = $('#example1').DataTable({
            stateSave: true,
            data: data_filter,
            columns: [
              { data: 'DocType', title: 'DocTypes', className: "text-center" },
              { data: 'TaxDate', title: 'วันที่ออก' },
              { data: 'FullTaxNumber' },
              { data: 'ShipToName' },
              { data: 'DocTotal' },
              {
                title: 'Actions',
                className: 'text-center',
                data: null,
                render: function (data: any, type: any, row: any) {
                  console.log(`tax is ${row.FullTaxNumber}`);
                  return '<button class="btn btn-primary btn-details" data-fulltaxnumber="' + row.FullTaxNumber + '">รายละเอียด</button>';
                }
              },
            ]
          });

          $(document).on('click', '.btn-details', () => {
            var fullTaxNumber = $(event?.target).data('fulltaxnumber');
            this.share.taxNumber = fullTaxNumber;
            console.log(`when click: ${fullTaxNumber}`);
            this.router.navigate(['/invoice-details'])
          });
        });

      });


  }






}

function onButtonClick(myNum: any, any: any) {
  throw new Error('Function not implemented.');
}
// function onButtonClick(FullTaxNumber: any) {
//   throw new Error('Function not implemented.');
// }

