import { Injectable } from '@angular/core';
import { PO, SumOrder } from '../interfaces/PO';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor() { }

  customer_code: string ='10008690100';
  sum_INV: number = 0;
  sum_CN:  number = 0;

  n_Inv: number = 0;
  n_CN: number = 0
  
  INV: any ='';
  CN: any ='';

  lastUpdate: any;
  
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
  


//สำหรับ เก็บว่า user login ด้วยสถานะใด เช่น  admin หรือ member
currentUser:string ='member';

access_token:string ='';
}



