export interface PO {
    Customer_id:string;
    PO_no:string;
    Date:string;
    ShipTo:string;
    BillTo:string;
    Transport:string;
    CreditLimit:number;
    AmountRTP:number;          //ราคาปลีก * จำนวน  
    AmountSale:number;         //ราคาลด  * จำนวน
    AmountBillDiscount:number; //  ส่วนลด2  * จำนวน
    Total:number;
    Vat:number;
    GrandTotal:number;
  
  
  }
  
  
  
  export interface  SumOrder { 
      ItemCode: string;
      ItemName: string;
      RetailPrice: number;
      Qty: number;
      Discount:number;        // %ลด1
      SumRetailPrice:number;  // ราคาปลีก * จำนวน   ในบรรทัด
      BillDiscount:number;    // %ลด2
      SumBillDiscount:number; // ราคาปลีก * จำนวน * %ลด2   ในบรรทัด
      Subtotal:number;        // ราคาปลีก * จำนวน * (100 - %ลด1)/100   ในบรรทัด
      DueDate:string;
      Checked?:boolean;
  }