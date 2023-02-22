import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CnDetailsComponent } from './components/cn-details/cn-details.component';
import { CnListComponent } from './components/cn-list/cn-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { PartListComponent } from './components/part-list/part-list.component';

const routes: Routes = [
  { path: "invoice-list", component: InvoiceListComponent },
  { path: "cn-list", component: CnListComponent },
  { path: "cn-details", component: CnDetailsComponent },
  { path: "part-list", component: PartListComponent },
  { path: "dashboard", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapRoutingModule { }
