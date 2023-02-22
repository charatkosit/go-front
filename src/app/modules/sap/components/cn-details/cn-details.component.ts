import { Component, OnInit } from '@angular/core';
import { SapService } from 'src/app/services/sap.service';
declare var $: any;

@Component({
  selector: 'app-cn-details',
  templateUrl: './cn-details.component.html',
  styleUrls: ['./cn-details.component.css']
})
export class CnDetailsComponent implements OnInit {

  customer_code = '10008690100';
  taxnumber = 'LCN123020022';
  doctype = 'CN'
  // customer_code: string, taxnumber: string, doctype: string
  constructor(private sap: SapService) { }

  ngOnInit() {

    this.sap.getSapCreditNoteDetails(this.customer_code,this.taxnumber, this.doctype )
      .subscribe((res:any) => {

        const data = res.data;
        

        $('#example1').DataTable({
          data: data,
          columns: [
            { data: 'ItemCode' },
            { data: 'ItemName' },
            { data: 'Quantity' },
            { data: 'Price' },
            { data: 'DiscPrcnt',
              className: "text-right",
              render: function (data:any){
                var number = $.fn.dataTable.render
                .number(',', '.', 2, '')
                .display(data);
                return number;
              }
             },
            { data: 'LineTotal' },

            { data: 'BillDisAmt' },

            { data: 'LineTotalAfterBillDisc' },


          ]

         
        }); 

      });

  }

}

