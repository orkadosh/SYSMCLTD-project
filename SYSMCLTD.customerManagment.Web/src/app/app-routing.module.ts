import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from '../component/customer-list/customer-list.component';
import { CustomerAddComponent } from '../component/customer-add/customer-add.component';
import { routes } from './app.routes';

// export const routes: Routes = [
//   {path:'', pathMatch:'full', redirectTo:'customer'},
//   {path:'customer', component:CustomerListComponent},
//   {path:'addCustomer', component:CustomerAddComponent}
// ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[CommonModule]

})
export class AppRoutingModule { }
