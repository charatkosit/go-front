import { Component, OnInit } from '@angular/core';
import { ApiInvoiceDetails } from 'src/app/interfaces/ApiInvoiceDetails';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  constructor(private sap: SapService,
    private location: Location,
    public share: ShareService) { }


  //-----------ประกาศตัวแปร----------------
  customer_code:any = localStorage.getItem(environment.user_code)
  taxnumber = this.share.taxNumber;
  doctype = 'INV';
  data: boolean = false;
  subTotal = 0;
  taxVAT = 0;
  grandTotal = 0;
  //--------------------------------------


  ngOnInit(): void {

    // console.log(`customer_code is ${this.customer_code}`)
    // console.log(`tax is  :  ${this.share.taxNumber}`)
    this.sap.getSapInvoiceDetails(this.customer_code, this.taxnumber, this.doctype)
      .subscribe((res: ApiInvoiceDetails) => {

        const data_filter = res.data;
        this.subTotal = data_filter.reduce((acc, item) => acc + parseFloat(item.LineTotalAfterBillDisc), 0);
        console.log(`sumInvDetail ${this.subTotal}`)

        //คำนวณ VAT
        this.taxVAT = this.subTotal * 0.07;

        //ราคารวม VAT
        this.grandTotal = this.subTotal * 1.07;
     
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
              title: 'ยอดรวม',
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
              title: 'ส่วนลดท้ายบิล',
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
