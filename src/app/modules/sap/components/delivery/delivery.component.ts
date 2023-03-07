import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';
declare var $: any;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(public share:ShareService,
    private router: Router) { }
  
  //-----------ประกาศตัวแปร----------------
  data_filter:any  =this.share.INV
  //--------------------------------------


  ngOnInit(): void {
    


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
            data: 'DocTotal', title: 'ราคารวม(VAT)' ,className: 'text-right',
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
        this.router.navigate(['/invoice-details'])
      });
    });
  }

}
