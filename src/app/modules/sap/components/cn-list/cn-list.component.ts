import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInvoice, Invoice } from 'src/app/interfaces/ApiInvoice';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-cn-list',
  templateUrl: './cn-list.component.html',
  styleUrls: ['./cn-list.component.css']
})
export class CnListComponent implements OnInit {

  customer_code = environment.user_code;
  invoice: Invoice[] = [];

  sumCN: number = 0;
  isdata: boolean = false;

  constructor(

    private router: Router,
    private sap: SapService,
    public share: ShareService) { }


  ngOnInit() {

    this.sap.getSapInvoice(this.customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter = res.data.filter(resf => {
          return resf.DocType.includes('CN')
        })
        this.sumCN = data_filter.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_CN = this.sumCN;
        this.isdata = true;
        $(document).ready(() => {
          var table = $('#example1').DataTable({
            stateSave: true,
            data: data_filter,
            columns: [
              { data: 'DocType', title: 'DocTypes', className: "text-center" },
              { data: 'TaxDate', title: 'วันที่ออก', className: "text-center" },
              { data: 'FullTaxNumber' },
              { data: 'ShipToName' },
              {
                data: 'DocTotal', title: 'ราคารวม', className: 'text-right',
                render: function (data: any) {
                  var number = $.fn.dataTable.render
                    .number(',', '.', 2, '')
                    .display(data);
                  return number;
                }
              },
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
            this.router.navigate(['/cn-details'])
          });
        });

      });


  }



}


