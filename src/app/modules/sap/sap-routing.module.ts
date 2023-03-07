import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CheckDiscountComponent } from './components/check-discount/check-discount.component';
import { CnDetailsComponent } from './components/cn-details/cn-details.component';
import { CnListComponent } from './components/cn-list/cn-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceTempComponent } from './components/invoice-temp/invoice-temp.component';
import { PartListComponent } from './components/part-list/part-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: "delivery",         component: DeliveryComponent,    canActivate: [AuthGuard] },
      { path: "invoice-list",     component: InvoiceListComponent,    canActivate: [AuthGuard] },
      { path: "invoice-details",  component: InvoiceDetailsComponent, canActivate: [AuthGuard] },
      { path: "invoice-temp",     component: InvoiceTempComponent,    canActivate: [AuthGuard] },
      { path: "cn-list",          component: CnListComponent,         canActivate: [AuthGuard] },
      { path: "cn-details",       component: CnDetailsComponent,      canActivate: [AuthGuard] },
      { path: "part-list",        component: PartListComponent,       canActivate: [AuthGuard] },
      { path: "check-discount",   component: CheckDiscountComponent,  canActivate: [AuthGuard] },
      { path: "dashboard",        component: DashboardComponent,      canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapRoutingModule { }
