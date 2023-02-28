import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SapRoutingModule } from './sap-routing.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { CnListComponent } from './components/cn-list/cn-list.component';
import { PartListComponent } from './components/part-list/part-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CnDetailsComponent } from './components/cn-details/cn-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceTempComponent } from './components/invoice-temp/invoice-temp.component';
import { CheckDiscountComponent } from './components/check-discount/check-discount.component';


@NgModule({
  declarations: [
  
    InvoiceListComponent,
    InvoiceDetailsComponent,
    CnListComponent,
    PartListComponent,
    CnDetailsComponent,
    DashboardComponent,
    InvoiceTempComponent,
    CheckDiscountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SapRoutingModule
  ]
})
export class SapModule { }
