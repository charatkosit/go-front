import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckDiscountComponent } from './components/check-discount/check-discount.component';
import { CnDetailsComponent } from './components/cn-details/cn-details.component';
import { CnListComponent } from './components/cn-list/cn-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceTempComponent } from './components/invoice-temp/invoice-temp.component';
import { PartListComponent } from './components/part-list/part-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: "invoice-list",    component: InvoiceListComponent },
      { path: "invoice-details", component: InvoiceDetailsComponent },
      { path: "invoice-temp",    component: InvoiceTempComponent },
      { path: "cn-list",         component: CnListComponent },
      { path: "cn-details",      component: CnDetailsComponent },
      { path: "part-list",       component: PartListComponent },
      { path: "check-discount",  component: CheckDiscountComponent },
      { path: "dashboard",       component: DashboardComponent },
      { path: '',           redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapRoutingModule { }
