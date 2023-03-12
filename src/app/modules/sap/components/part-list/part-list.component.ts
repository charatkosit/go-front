import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Partlist, TablePartlist } from 'src/app/interfaces/ApiPartlist';
import { goApiPartlist } from 'src/app/interfaces/goApiPartlist';
import { SumOrder } from 'src/app/interfaces/PO';
import { SapService } from 'src/app/services/sap.service';
import { ShareService } from 'src/app/services/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-part-list',
    templateUrl: './part-list.component.html',
    styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {

    constructor(private fb: FormBuilder,
        private sap: SapService,
        private share: ShareService) { }

    //-------------ประกาศตัวแปร------------------------
    searchForm!: FormGroup;
    mycart: string[] = [];
    apiPartlist!: goApiPartlist;
    partlist: Partlist[] = [];
    tablePartlist: TablePartlist[] = [];
    // Order:SumOrder[] =[];


    brandForm = new FormControl();
    numberForm = new FormControl();
    itemnameForm = new FormControl();
    modelForm = new FormControl();
    totalFound: number = 0;

    // customer_code = this.share.customer_code;
    customer_code:any = localStorage.getItem(environment.user_code)
    discount: number = 0;
    billDiscount: number = 0;
    specialPrice: number = 0;

    keyword: string = '';
    keyword_1: string = '';
    var1: string = '';
    var2: string = '';
    var3: string = '';
    var4: string = '';
    page: number = 0;
    page_size: number = 0;
    no_start: number = 0
    no_end: number = 0
    result: TablePartlist[] = [];
    eth: any;

    mock_brand: any[] = [
        { brand: 'ACD', display: 'ACDelco' },
        { brand: 'CHE', display: 'Chevrolet' },
        { brand: 'FOR', display: 'Ford' },
        { brand: 'HIN', display: 'Hino' },
        { brand: 'HON', display: 'Honda' },
        { brand: 'HYU', display: 'Hyundai' },
        { brand: 'ISU', display: 'Isuzu' },
        { brand: 'MAZ', display: 'Mazda' },
        { brand: 'MGP', display: 'MGP' },
        { brand: 'MIT', display: 'Misubishi' },
        { brand: 'NIS', display: 'Nissan' },
        { brand: 'NIU', display: 'NIU' },
        { brand: 'SUZ', display: 'Suzuki' },
        { brand: 'TOY', display: 'Toyota' },
        { brand: 'TRW', display: 'TRW' },
    ];

    //-------------------------------------------------------

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            brand: ['', [Validators.maxLength(10)]],
            itemName: ['', Validators.maxLength(30)],
            number: ['', Validators.maxLength(30)],
            model: ['', Validators.maxLength(30)],
        })

        $(function () {
            $("#example1").DataTable({


                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
                "searching": false,
                "paging": true,
                "info": false,
                "ordering": false,
                "dom": 'Bfrtip',
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#example1_wrapper .col-md:eq(0)');

        });





    }




    onSubmitSearch(value: any) {
        //   รับค่าจาก template
        console.log(`value brand is ${value.brand}`)
        console.log(`value itemName is ${value.itemName}`)
        console.log(`value number is ${value.number}`)
        console.log(`value model is ${value.model}`)
        this.var1 = value.itemName;
        this.var2 = value.number;
        this.var3 = value.brand;
        this.var4 = value.model;

        this.page = 1;
        this.page_size = 20;
        this.no_start = this.page * this.page_size - (this.page_size - 1)
        this.no_end = this.page * this.page_size
        // keyword = ItemName=&ItemCode=&Brand=&Model=

        //นำค่ามาต่อกัน แล้วเอาคำว่า null ออก
        this.keyword = `ItemName=${this.var1}&ItemCode=${this.var2}&Brand=${this.var3}&Model=${this.var4}&page=${this.page}&page_size=${this.page_size}`
        this.keyword = this.keyword.replace(/null/g, '');
        this.keyword_1 = this.keyword;
        console.log(this.keyword)
        //ยิง api get 
        this.sap.getPartlistByKeyword(this.keyword)
            .subscribe((res: goApiPartlist) => {
                this.apiPartlist = res;
                this.partlist = this.apiPartlist.data
                this.totalFound = this.apiPartlist.resultFound
                console.log(this.totalFound)
                console.log(this.partlist[0].ItemCode)
            })
        console.log(this.partlist)
        return this.partlist;
    }

    onSelectTest(itemCode: string, itemName: string, retailPrice: number, qty: number = 1) {
        console.log(`itemCode: ${itemCode}, customer_code: ${this.customer_code} `)
        this.sap.getSapCustomerDiscount(this.customer_code, itemCode).subscribe((res: any) => {
            const data = res.data;
            this.discount = data[0].Discount;
            this.billDiscount = data[0].BillDiscount;

            console.log(`ItemCode: ${itemCode} ส่วนลด ${this.discount}  ${this.billDiscount}`)
        })
    }

    onSelect(itemCode: string, itemName: string, retailPrice: number, qty: number = 1) {
        //    หมายเหตุ ขณะเลือกสินค้า ให้ ยิง api ไปตรวจสอบ ส่วนลดสินค้าแต่ละตัวด้วย
        //       retailPrice  = ราคาปลีก
        //       qty          = จำนวน
        //       discount     = ส่วนลดครั้งที่ 1  เป็น %
        //       billDiscount = ส่วนลดครั้งที่ 2  เป็น %

        //check discount %
        let sumRetailPrice: number = 0;
        let sumBillDiscount = 0;
        let subTotal = 0






        //---------------------------------------
        let cart: SumOrder = {    //รายบรรทัด
            ItemCode: '',
            ItemName: '',
            RetailPrice: 0,
            Qty: qty,
            SumRetailPrice: 0,
            Discount: this.discount,
            BillDiscount: this.billDiscount,
            SumBillDiscount: sumBillDiscount,
            DueDate: '',
            Subtotal: 0
        }


        console.log(this.share.sumCart);
        console.log("Selected Product Id: ", itemCode); // You get the Id of the selected item here
        // let qty: number = 1;

        // ตรวจดูก่อน ถ้า ItemCode ไม่เคยมีก่อนหน้า  qty=1
        const index = this.share.sumCart.findIndex((element) => element.ItemCode === itemCode);
        console.log(index)
        // return -1 ไม่มี  , return 2 หมายถึง index2

        if (index < 0) {
            // ถ้า return -1 แสดงว่าไม่มีค่า ซ้ำ   
            // แสดงว่าเป็นรายการใหม่
            //  ให้ ถาม api  ส่วนลด
            this.sap.getSapCustomerDiscount(this.customer_code, itemCode).subscribe((res: any) => {
                const data = res.data;
                this.discount = data[0].Discount;
                this.billDiscount = data[0].BillDiscount;

                console.log(`ItemCode: ${itemCode} ส่วนลด ${this.discount}  ${this.billDiscount}`)

                console.log(`this.discount : ${this.discount}`)
                subTotal = retailPrice * (1 - this.discount / 100);
                sumRetailPrice = retailPrice * qty;
                sumBillDiscount = subTotal * (this.billDiscount / 100);

                cart = {
                    ItemCode: itemCode,
                    ItemName: itemName,
                    RetailPrice: retailPrice,
                    Qty: qty,
                    SumRetailPrice: sumRetailPrice,
                    Discount: this.discount,
                    BillDiscount: this.billDiscount,
                    SumBillDiscount: sumBillDiscount,
                    DueDate: '',
                    Subtotal: subTotal
                }

                console.log(`befor puth to sumCart ${JSON.stringify(cart)}`)
                this.share.sumCart.push(cart)
                this.share.count++


            })

        } else {
            // ถ้าพบ index ให้ เอาค่า ไปดึง qty มา บวก 1 แล้ว  update
            this.share.sumCart[index].Qty++
            this.share.sumCart[index].SumRetailPrice = this.share.sumCart[index].RetailPrice * this.share.sumCart[index].Qty;
            this.share.sumCart[index].Subtotal = this.share.sumCart[index].SumRetailPrice * (1 - this.share.sumCart[index].Discount / 100)
            this.share.sumCart[index].SumBillDiscount = this.share.sumCart[index].Subtotal * (this.share.sumCart[index].BillDiscount / 100)
            this.share.count++
            console.log(`sumBillDiscount: ${this.share.sumCart[index].SumBillDiscount} `)
        }

        // ทำการคำนวณ sum ทั้งหมด
        // AmountRTP    sum ( ราคาปลีก x จำนวน )  
        let sum: number = 0;
        this.share.sumCart.forEach(a => sum += a.SumRetailPrice)
        this.share.myPO.AmountRTP = sum;
        console.log(`AmountRTP: ${this.share.myPO.AmountRTP}`)

        // AmountSale  sum of( ราคาปลีก x (100 - %ส่วนลดครั้งที่1)/100  x จำนวน)
        let sum_amountSale = 0;
        this.share.sumCart.forEach(a => sum_amountSale += a.Subtotal)
        this.share.myPO.AmountSale = sum_amountSale
        console.log(`AmountSale: ${this.share.myPO.AmountSale}`)

        //AmountBillDiscount  ลดท้ายบิล หรือ sum of( ราคาลดแล้วครั้งที่1 x   %ส่วนลดครั้งที่2)
        let sum_amountBill = 0;
        this.share.sumCart.forEach(a => sum_amountBill += a.SumBillDiscount)
        this.share.myPO.AmountBillDiscount = sum_amountBill
        console.log(`AmountBillDiscount: ${this.share.myPO.AmountBillDiscount}`)

        //Total
        let Total = 0
        Total = sum_amountSale - sum_amountBill
        this.share.myPO.Total = Total;
        console.log(`Total: ${this.share.myPO.Total}`)

        //Vat
        let vat = 0;
        vat = Total * 0.07
        this.share.myPO.Vat = vat
        console.log(`VAT: ${this.share.myPO.Vat}`)

        //GrandTotal
        let GrandTotal = 0
        GrandTotal = Total + vat
        this.share.myPO.GrandTotal = GrandTotal
        console.log(`GrandTotal: ${this.share.myPO.GrandTotal}`)



        // ตรวจดู
        console.log(this.share.sumCart)
        this.onAlert();
    }


    onAlert() {
        $(function () {
            var Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1600
            });


            Toast.fire({
                icon: 'success',
                title: 'เพิ่มสินค้า ลงในตระกร้า'
            });


        });
    }
}
