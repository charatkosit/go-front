import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  customer_code: string ='ยังไม่กำหนด';
  sum_INV: number = 0;
  sum_CN:  number = 0;
  
  constructor() { }
}
