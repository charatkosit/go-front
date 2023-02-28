import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiBillTo, BillTo } from 'src/app/interfaces/ApiBillTo';
import { SumOrder } from 'src/app/interfaces/PO';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-check-discount',
  templateUrl: './check-discount.component.html',
  styleUrls: ['./check-discount.component.css']
})
export class CheckDiscountComponent implements OnInit {


  myCart: SumOrder[] = [];  //รายการสินค้าใน ตระกร้าที่ต้องการดู ส่วนลด

  // สำหรับ กำหนด ตัวแปร  
  isdata: boolean = false;
  cart: any[] =[];   // สำหรับ
  amountRTP: number = 0;
  amountSale: number = 0;
  amountBillDiscount: number = 0;
  sumBillDiscount: number = 0;
  total: number = 0;
  grandTotal: number = 0;
  isEditable: boolean = false;
  isEditMode: boolean = false;
 
  
  myCartHistory: SumOrder[] = []; //สำหรับ การทำรายการ Edit แล้วยกเลิก
  
  vat: number = 0; // vat 7%  =( ราคารวม * (1-BillDiscount) * 0.07)
  billDiscount: number = 0;   // % ลดท้ายบิล
  historyQty: number[] = [] // สำหรับเก็บ จำนวน ก่อน edit ถ้าต้องกดปุ่ม cancel จะนำค่านี้ออกมา

  
  today!: any;
  isSelect: boolean = false;
  isSelectListAll: boolean = false;
  arraySelect: string[] = [];
  showAllCheckBox: boolean = false;
  isDisabled = true;


  apiBillTo: BillTo[] = []
  billToName: string = ''
  billToAddress: string = ''
  billToTax: string = ''


  mockApiBill: ApiBillTo = {
    "errorCode": "0",
    "resultFound": "2",
    "data": [
      {
        "BillToName": "บจก.โล้วเฮงหมงอะไหล่ยนต์",
        "BillToCode": "10019590100-001",
        "BillToAddress": "49/3 ถนนแสงชูโตใหม่ ตำบลท่าเรืออำเภอท่ามะกา จังหวัดกาญจนบุรี 71130",
        "BillToTaxID": "0715556001816",
        "BillToBranch": "00000"
      },
      {
        "BillToName": "บจก.โล้วเฮงหมงอะไหล่ยนต์",
        "BillToCode": "20019590100-001",
        "BillToAddress": "49/3 ถนนแสงชูโตใหม่ ตำบลท่าเรืออำเภอท่ามะกา จังหวัดกาญจนบุรี 71130",
        "BillToTaxID": "0715556001816",
        "BillToBranch": "00000"
      }
    ]
  }
  // -----------------------------
  constructor(public share: ShareService,
              private router: Router
    ) { }




  ngOnInit(): void {
    console.log("Hello shopping cart")

    // clear arraySelect
    this.arraySelect = []
    console.log(`arraySelect ngOnInit: ${this.arraySelect}`)

  
    this.myCart = this.share.sumCart;   //


    // this.totalBillDiscount = this.total * (1 - (this.billDiscount / 100));
 
    this.amountRTP = this.getAmountRTP();
    this.sumBillDiscount = this.getSumBillDiscount();

    this.amountSale = this.getAmountSale();
    this.amountBillDiscount = this.getSumBillDiscount();


    this.total = this.amountSale - this.sumBillDiscount;
    this.vat = this.total * 0.07
    this.grandTotal = this.total + this.vat


    this.showAllCheckBox = true;
    console.log(`this.showAllCheckBox: ${this.showAllCheckBox}`)

    this.today = new Date();
    console.log(`today is: ${this.today}`)
    console.log(this.myCart)


    // api to get billTo
    this.apiBillTo = this.mockApiBill.data
    this.billToTax = this.apiBillTo[0].BillToTaxID
    this.billToName = this.apiBillTo[0].BillToName
    this.billToAddress = this.apiBillTo[0].BillToAddress

    console.log(this.billToName)
  }






//เมื่อเปลี่ยนจำนวน ให้คำนวณ ใหม่ทั้งหมด
  onChangeQty(index: number, ev: any) {

    console.log(`ev.target.value: ${ev.target.value}`)
    let qty = ev.target.value;


    console.log(`index: ${index}`)
    this.billDiscount = 2.6667
    this.share.sumCart[index].Qty = qty;
    this.share.sumCart[index].SumRetailPrice = this.share.sumCart[index].Qty * this.share.sumCart[index].RetailPrice
    this.share.sumCart[index].Subtotal = this.share.sumCart[index].SumRetailPrice * (1 - this.share.sumCart[index].Discount / 100)
    this.share.sumCart[index].SumBillDiscount = this.share.sumCart[index].Subtotal * this.billDiscount / 100
    // let co = 0; 
    // this.share.count = Number(this.share.sumCart.forEach( x =>  co += x.Qty))
    this.myCart[index] = this.share.sumCart[index]

    // AmountRTP
    let sum_RTP: number = 0;
    this.share.sumCart.forEach(a => sum_RTP += a.SumRetailPrice)
    this.amountRTP = sum_RTP;
    this.share.myPO.AmountRTP = sum_RTP;
    console.log(`AmountRTP: ${this.share.myPO.AmountRTP}`)

    // AmountSale
    let sum_amountSale = 0;
    this.share.sumCart.forEach(a => sum_amountSale += a.Subtotal)
    this.amountSale = sum_amountSale;
    this.share.myPO.AmountSale = sum_amountSale
    console.log(`AmountSale: ${this.share.myPO.AmountSale}`)

    //AmountBillDiscount  ลดท้ายบิล
    let sum_amountBill = 0;
    this.share.sumCart.forEach(a => sum_amountBill += a.SumBillDiscount)
    this.amountBillDiscount = sum_amountBill;
    this.share.myPO.AmountBillDiscount = sum_amountBill
    console.log(`AmountBillDiscount: ${this.share.myPO.AmountBillDiscount}`)

    //Total
    let Total = 0
    Total = sum_amountSale - sum_amountBill
    this.total = Total
    this.share.myPO.Total = Total;
    console.log(`Total: ${this.share.myPO.Total}`)

    //Vat
    let vat = 0;
    vat = Total * 0.07
    this.vat = vat;
    this.share.myPO.Vat = vat
    console.log(`VAT: ${this.share.myPO.Vat}`)

    //GrandTotal
    let GrandTotal = 0
    GrandTotal = Total + vat
    this.grandTotal = GrandTotal
    this.share.myPO.GrandTotal = GrandTotal
    console.log(`GrandTotal: ${this.share.myPO.GrandTotal}`)
    console.log(`this.share.sumCart: ${this.share.sumCart[index]}`)


  }


  // 
  onEnableDelete(){}


  // ก่อนแแก้ไข ให้เก็บค่าเก่าไว้ก่อน จะได้ undo ได้
  onClickEdit() {

    this.isEditable = true;
    this.isEditMode = true;
    this.isSelect = false;

    // เก็บข้อมูลในตะกร้า ก่อนเปลี่ยนแปลง สำหรับ การยกเลิก
    this.myCartHistory = this.myCart;
    this.myCartHistory.forEach(x => {
      this.historyQty.push(x.Qty)
    })
    console.log(this.myCartHistory)
    console.log(`historyQty: ${this.historyQty}`)


  }

  onClickDelete() {
    //นำ arraySelcet มาดูว่ามีรายชื่ออะไรบ้างที่ต้อง ลบออก
    //ทำการลบรายชื่อออกใน this.myCart ออก
    //หาขนาด arraySelect.length

    let key: any
    let index: number;

    if (this.arraySelect.length == this.myCart.length) {
      this.share.count = 0;
      this.share.sumCart = [];
      this.myCart = [];
      this.amountRTP = 0;
      this.amountSale = 0;
      this.total = 0;
      this.sumBillDiscount = 0;
      this.amountBillDiscount =0;
      this.vat = 0;
      this.grandTotal = 0;
      this.isSelect = false;
      this.isDisabled = false;
      this.showAllCheckBox = false;
    } else {

      this.arraySelect.filter(key => {
        index = this.myCart.findIndex(x => x.ItemCode == key)
        this.share.count = this.share.count - this.myCart[index].Qty
        this.myCart.splice(index, 1)
      })

      this.arraySelect = []
      this.isSelect = false;  // ปิดปุ่ม Delete และ Edit

      // ทำการคำนวณ sum ทั้งหมด
      // AmountRTP
      let sum_RTP: number = 0;
      this.share.sumCart.forEach(a => sum_RTP += a.SumRetailPrice)
      this.amountRTP = sum_RTP;
      this.share.myPO.AmountRTP = sum_RTP;
      console.log(`AmountRTP: ${this.share.myPO.AmountRTP}`)

      // AmountSale
      let sum_amountSale = 0;
      this.share.sumCart.forEach(a => sum_amountSale += a.Subtotal)
      this.amountSale = sum_amountSale;
      this.share.myPO.AmountSale = sum_amountSale
      console.log(`AmountSale: ${this.share.myPO.AmountSale}`)

      //AmountBillDiscount  ลดท้ายบิล
      let sum_amountBill = 0;
      this.share.sumCart.forEach(a => sum_amountBill += a.SumBillDiscount)
      this.amountBillDiscount = sum_amountBill;
      this.share.myPO.AmountBillDiscount = sum_amountBill;
      console.log(`ลดท้ายบิล ${this.amountBillDiscount}`)
      console.log(`AmountBillDiscount: ${this.share.myPO.AmountBillDiscount}`)

      //Total
      let Total = 0
      Total = sum_amountSale - sum_amountBill
      this.total = Total
      this.share.myPO.Total = Total;
      console.log(`Total: ${this.share.myPO.Total}`)

      //Vat
      let vat = 0;
      vat = Total * 0.07
      this.vat = vat;
      this.share.myPO.Vat = vat
      console.log(`VAT: ${this.share.myPO.Vat}`)

      //GrandTotal
      let GrandTotal = 0
      GrandTotal = Total + vat
      this.grandTotal = GrandTotal
      this.share.myPO.GrandTotal = GrandTotal
      console.log(`GrandTotal: ${this.share.myPO.GrandTotal}`)

   }
  }

  onClickCancel() {
    this.arraySelect = []
    let j: any
    this.isSelect = false
    this.isEditMode = false
    this.isEditable = false
    this.share.sumCart = this.myCartHistory;
    this.myCart = this.share.sumCart;
    alert(JSON.stringify(this.myCartHistory))
    alert(JSON.stringify(this.share.sumCart))
    alert(JSON.stringify(this.myCart))
    this.myCart.forEach(x => x.Checked = false)

    this.share.sumCart.forEach(x => {
      j = this.historyQty.shift()
      x.Qty = j;
      console.log(`j: ${j}`)
      console.log(`x.Qty: ${x.Qty}`)
    })

    //update in cart row
    this.share.sumCart.forEach(x => {
      x.SumRetailPrice = x.RetailPrice * x.Qty
      x.Subtotal = x.SumRetailPrice * (1 - x.Discount / 100)
      // x.BillDiscount = x.Subtotal * x.BillDiscount/100
    })

    // ทำการคำนวณ sum ทั้งหมดของ (ราคาปลีก x จำนวน)
    // AmountRTP
    let sum_RTP: number = 0;
    this.share.sumCart.forEach(a => sum_RTP += a.SumRetailPrice)
    this.amountRTP = sum_RTP;
    this.share.myPO.AmountRTP = sum_RTP;
    console.log(`AmountRTP: ${this.share.myPO.AmountRTP}`)

    // AmountSale
    let sum_amountSale = 0;
    this.share.sumCart.forEach(a => sum_amountSale += a.Subtotal)
    this.amountSale = sum_amountSale;
    this.share.myPO.AmountSale = sum_amountSale
    console.log(`AmountSale: ${this.share.myPO.AmountSale}`)

    //AmountBillDiscount  ลดท้ายบิล
    let sum_amountBill = 0;
    this.share.sumCart.forEach(a => sum_amountBill += a.SumBillDiscount)
    this.amountBillDiscount = sum_amountBill;
    this.share.myPO.AmountBillDiscount = sum_amountBill
    console.log(`AmountBillDiscount: ${this.share.myPO.AmountBillDiscount}`)

    //Total
    let Total = 0
    Total = sum_amountSale - sum_amountBill
    this.total = Total
    this.share.myPO.Total = Total;
    console.log(`Total: ${this.share.myPO.Total}`)

    //Vat
    let vat = 0;
    vat = Total * 0.07
    this.vat = vat;
    this.share.myPO.Vat = vat
    console.log(`VAT: ${this.share.myPO.Vat}`)

    //GrandTotal
    let GrandTotal = 0
    GrandTotal = Total + vat
    this.grandTotal = GrandTotal
    this.share.myPO.GrandTotal = GrandTotal
    console.log(`GrandTotal: ${this.share.myPO.GrandTotal}`)

    this.router.navigate(['/shoppingcart'])
  }

  onClickUpdate() {
    this.arraySelect = []
    this.isSelect = false;  // ปิดปุ่ม Delete และ Edit
    this.isEditMode = false;
    this.isEditable = false;
    this.myCart.forEach(x => x.Checked = false)

    // ทำการคำนวณ sum ทั้งหมด

    console.log(`this.share.sumCart: ${this.share.sumCart[0].Qty}`)
    this.router.navigate(['/shoppingcart'])

  }

  checkAllCheckBox(ev: any) {
    if (ev.target.checked) {
      this.myCart.forEach(x => {
        x.Checked = ev.target.checked;
        // this.arraySelect = []
        this.arraySelect.push(x.ItemCode)
        console.log(`arraySelect on checkAllCheckBox: ${this.arraySelect}`)
        // console.log(`x: ${x.ItemCode}`)
        this.isSelect = true;
      })
    } else {
      //clear arraySelect if unCheck
      this.myCart.forEach(x => {
        x.Checked = ev.target.checked;
        this.arraySelect = []
      })
      //  this.arraySelect = [];
      this.isSelect = false;

    }

    console.log(`arraySelect:  ${this.arraySelect}`)

  }



  checkSingleCheckBox(itemCode: string, ev: any) {

    console.log(`checkSingleCheckBox: ${itemCode} ${ev.target.checked} `)
    // if fasle delete itemCode from arraySelect
    // this.showAllCheckBox = true;
    // it true add itemCode to arraySelect
    if (ev.target.checked) {
      this.arraySelect.push(itemCode)
      this.isSelect = true;
      console.log(`arraySelect on checkSingleCheckBox: ${this.arraySelect}`)
    } else {

      const index = this.arraySelect.indexOf(itemCode)
      this.arraySelect.splice(index, 1)
      console.log(`to remove ${itemCode} from arraySelect:${this.arraySelect}`)
      if (this.arraySelect.length == 0) {
        this.isSelect = false;
      }
    }


  }



  isAllCheckBoxChecked() {
    return this.myCart.every(p => p.Checked);
  }



  getAmountSale() {
    let amountSale = 0
    // for (let i = 0; i < this.myCart.length; i++) {
    //   amountSale = this.myCart[i].Subtotal + amountSale

    // }

    this.myCart.forEach(b => amountSale += b.Subtotal)
    return amountSale;
  }


  getAmountRTP() {
    let amountRTP = 0
    // for (let i = 0; i < this.share.sumCart.length; i++) {
    //   amountRTP = this.share.sumCart[i].SumRetailPrice + amountRTP
    // }
    this.share.sumCart.forEach(a => amountRTP += a.SumRetailPrice)

    return amountRTP
  }


  getSumBillDiscount() {
    let sumBillDiscount = 0
    // for (let i = 0; i < this.share.sumCart.length; i++) {
    //   sumbBillDiscount = this.share.sumCart[i].Subtotal * (this.share.sumCart[i].BillDiscount / 100) + sumbBillDiscount
    // }

    this.share.sumCart.forEach(a => sumBillDiscount += a.SumBillDiscount)

    // this.share.sumCart.forEach( x => {
    //    sumBillDiscount += x.Subtotal * (x.BillDiscount/100)   

    // })

    console.log(`sumBillDiscount: ${sumBillDiscount}`)
    return sumBillDiscount
  }
}
