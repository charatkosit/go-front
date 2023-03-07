import { HttpClient } from '@angular/common/http';
import { DEFAULT_INTERPOLATION_CONFIG } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
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

  constructor(private sap: SapService,
    private router: Router,
    public share: ShareService) { }


  //-----------ประกาศตัวแปร----------------
  sumInv: number = this.share.sum_INV;
  data_filter: any = this.share.INV;
  lastUpdated: any = this.share.lastUpdate;
  timeString!: string;
  //---------------------------------------  

  ngOnInit() {

    setInterval(() => {
      this.updateTimeString();
    }, 1000);

    $(document).ready(() => {
      var table = $('#example1').DataTable({
        stateSave: true,
        data: this.data_filter,
        columns: [
          { data: 'DocType', title: 'DocTypes', className: "text-center" },
          { data: 'TaxDate', title: 'วันที่ออก' },
          { data: 'FullTaxNumber' },
          { data: 'ShipToName' },
          {
            data: 'DocTotal', title: 'ราคารวม(VAT)', className: 'text-right',
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
              // console.log(`tax is ${row.FullTaxNumber}`);
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




  }




  updateTimeString() {
    const lastUpdate = new Date(this.lastUpdated); // เวลา lastUpdate ที่จะเปรียบเทียบกับเวลาปัจจุบัน
    const currentTime = new Date();

    const seconds = Math.floor((currentTime.getTime() - lastUpdate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      this.timeString = `${hours} ชั่วโมงที่แล้ว`;
    } else if (minutes > 0) {
      this.timeString = `${minutes} นาทีที่แล้ว`;
    } else {
      this.timeString = `${seconds} วินาทีที่แล้ว`;
    }
  }



}
