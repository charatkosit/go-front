import { Injectable } from '@angular/core';
import { PO, SumOrder } from '../interfaces/PO';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  customer_code: string ='ยังไม่กำหนด';
  sum_INV: number = 0;
  sum_CN:  number = 0;
  
  cart:string[] = [];   // สำหรับเก็บ barcode สินค้าที่ต้องการมาเช็ค ส่วนลด
  count:number = 0;
  sumCart:SumOrder[] =[]

  myPO:PO ={
    Customer_id: '',
    PO_no: '',
    Date: '',
    ShipTo: '',
    BillTo: '',
    Transport: '',
    CreditLimit: 0,
    AmountRTP: 0,
    AmountSale: 0,
    AmountBillDiscount: 0,
    Total: 0,
    Vat: 0,
    GrandTotal: 0
  };
  
//สำหรับ ส่ง TaxNumber เมื่อกดปุ่ม  หน้า  invoice-temp เพื่อดู invoice-detail
 taxNumber: string ='';
  constructor() { }
}
