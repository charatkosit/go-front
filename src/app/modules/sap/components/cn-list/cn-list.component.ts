import { Component, OnInit } from '@angular/core';
import { ApiInvoice } from 'src/app/interfaces/ApiInvoice';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
declare var $: any;

@Component({
  selector: 'app-cn-list',
  templateUrl: './cn-list.component.html',
  styleUrls: ['./cn-list.component.css']
})
export class CnListComponent implements OnInit {

  customer_code = '10008690100';
  sumCN = 0;

  constructor(private sap: SapService,
              private share: ShareService) { }

  ngOnInit(): void {
    this.sap.getSapInvoice(this.customer_code)
      .subscribe((res: ApiInvoice) => {

        const data_filter = res.data.filter(resf => {
          return resf.DocType.includes('CN')
        })

        this.sumCN = data_filter.reduce((acc, item) => acc + parseFloat(item.DocTotal), 0);
        this.share.sum_CN = this.sumCN;
        // console.log(data_filter)
        console.log(`sum is ${this.sumCN}`)

        $('#example1').DataTable({
         
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
            }
          ]
        })

      });

  }
}


