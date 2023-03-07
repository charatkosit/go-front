import { Component, OnInit } from '@angular/core';
import { ApiInvoiceDetails } from 'src/app/interfaces/ApiInvoiceDetails';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-cn-details',
  templateUrl: './cn-details.component.html',
  styleUrls: ['./cn-details.component.css']
})


export class CnDetailsComponent implements OnInit {

  constructor(private sap: SapService,
    private location: Location,
    public share: ShareService) { }

    //---------------ประกาศตัวแปร---------------
  customer_code = environment.user_code;
  taxnumber = this.share.taxNumber;
  doctype = 'CN';
  // sumInv:number = 0;

  data: boolean = false;
  isdata: boolean = false;
 //--------------------------------------------


  ngOnInit(): void {


    console.log(`tax is  :  ${this.share.taxNumber}`)
    this.sap.getSapInvoiceDetails(this.customer_code, this.taxnumber, this.doctype)
      .subscribe((res: ApiInvoiceDetails) => {
        this.isdata = true;   //ข้อมูลจาก api ได้รับแล้ว
        const data_filter = res.data;

        $('#example1').DataTable({
          stateSave: true,
          data: data_filter,
          responsive: true,
          lengthChange: false,
          autoWidth: false,
          searching: false,
          paging: false,
          info: false,
          ordering: false,
          columns: [
            { data: 'ItemCode' },
            { data: 'ItemName', title: 'รายการ' },
            {
              data: 'Quantity',
              title: 'จำนวน',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 0, '')
                  .display(data);
                return number;
              }
            },
            {
              data: 'Price',
              title: 'ราคา',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            },
            {
              data: 'DiscPrcnt',
              title: 'ส่วนลด %',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            },
            {
              data: 'LineTotal',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            },
            {
              data: 'BillDisAmt',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            },
            {
              data: 'LineTotalAfterBillDisc',
              className: "text-right",
              render: function (data: any) {
                var number = $.fn.dataTable.render
                  .number(',', '.', 2, '')
                  .display(data);
                return number;
              }
            }


          ]


        });

      });
  }


  onClickBack() {
    this.location.back();
  }
}