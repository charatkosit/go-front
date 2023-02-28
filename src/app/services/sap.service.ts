import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiInvoice } from '../interfaces/ApiInvoice';
import { ApiInvoiceDetails } from '../interfaces/ApiInvoiceDetails';

@Injectable({
  providedIn: 'root'
})
export class SapService {
  private backendUrl = environment.backendUrl
  private sapUrl = environment.sapUrl;
  private sapApiToken = environment.sapApiToken;

  constructor(private http: HttpClient) { }


  getSapPartlist(partsno: string, partsname: string, brand: string, model: StringConstructor){
    // const uri = `${this.sapUrl}apigoplus/EnqPartlist/`
    const uri = `apigoplus/EnqPartlist/`
    const keyword = {
      token: this.sapApiToken,
      data: { partsno: partsno,
              partsnmae: partsname,
              brand: brand,
              model: model
             }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(uri,keyword,{headers})
  }

  getSapBillTo(customer_code: string){
    // const uri = `${this.sapUrl}apigoplus/GetBillTo/`
    const uri = `apigoplus/GetBillTo/`
    const keyword = {
      token: this.sapApiToken,
      data: { customer_code: customer_code }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(uri,keyword,{headers})
  }

  getSapShipping(BillTocode: string){
    // const uri = `${this.sapUrl}apigoplus/GetShipTo/`
    const uri = `apigoplus/GetShipTo/`
    const keyword = {
      token: this.sapApiToken,
      data: { BillToCode: BillTocode }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(uri,keyword,{headers})
  }

  getSapTransport(ShipTocode: string){
    // const uri = `${this.sapUrl}apigoplus/GetTransport/`
    const uri = `apigoplus/GetTransport/`
    const keyword = {
      token: this.sapApiToken,
      data: { ShipToCode: ShipTocode }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(uri,keyword,{headers})
  }


 getSapCustomerDiscount(CardCode: string, ItemCode: string){
    // const uri = `${this.sapUrl}apigoplus/GetItemInfo/`
    const uri = `apigoplus/GetItemInfo/`
    const keyword = {
      token: this.sapApiToken,
      data: { CardCode: CardCode,
              ItemCode: ItemCode
      }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const display = JSON.stringify(keyword)
    return  this.http.post<any>(uri,keyword,{headers})
  }


  getSapInvoice(customer_code: string) {
    // const uri = `${this.sapUrl}apigoplus/GetInv/`
    const uri = `apigoplus/GetInv/`

    const keyword = {
      token: this.sapApiToken,
      data: { customer_code: customer_code }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ApiInvoice>(uri,keyword,{headers})
  }
  
  getSapCreditNoteDetails(customer_code: string, taxnumber: string, doctype: string) {
    // const uri = `${this.sapUrl}apigoplus/GetInvDetails/`
    const uri = `apigoplus/GetInvDetails/`

    const keyword = {
      token: this.sapApiToken,
      data: { customer_code: customer_code,
              taxnumber: taxnumber,
              doctype: doctype
      }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<ApiInvoice>(uri,keyword,{headers})
  }


  getSapInvoiceDetails(customer_code: string, taxnumber: string, doctype: string) {
    // const uri = `${this.sapUrl}apigoplus/GetInvDetails/`
    const uri = `apigoplus/GetInvDetails/`

    const keyword = {
      token: this.sapApiToken,
      data: { customer_code: customer_code,
              taxnumber: taxnumber,
              doctype: doctype
           }
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(`uri is ${uri}`)
    return this.http.post<ApiInvoiceDetails>(uri,keyword,{headers})
  }
//------------------------------------------
  getPartlistByKeyword(keyword: string){
    // keyword = ItemName=&ItemCode=&Brand=&Model=
    // const uri = `${this.backendUrl}api/v1/products/pagination?${keyword}`
    const uri = `api/v1/products/pagination?${keyword}`

    return this.http.get<any>(uri,{ responseType: 'json' } )
  }
}


