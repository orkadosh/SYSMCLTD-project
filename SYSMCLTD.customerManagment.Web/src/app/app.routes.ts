import { Routes } from '@angular/router';
import { CustomerListComponent } from '../component/customer-list/customer-list.component';
import { CustomerAddComponent } from '../component/customer-add/customer-add.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'customer'},
    {path:'customer', component:CustomerListComponent},
    //{path:'addCustomer', component:CustomerAddComponent},
    {path:'addCustomer',loadComponent:()=> import('./../component/customer-add/customer-add.component').then(m=> m.CustomerAddComponent)},
    {path:'customer-details/:id',loadComponent:()=> import('./../component/customer-details/customer-details.component').then(m=> m.CustomerDetailsComponent)},
    {path:'addContact/:customerId',loadComponent:()=> import('./../component/add-contact/add-contact.component').then(m=> m.AddContactComponent)},
    {path:'updateCustomer/:customer',loadComponent:()=> import('./../component/customer-update/customer-update.component').then(m=> m.CustomerUpdateComponent)},
   // {path:'contact-list/:customerId',loadComponent:()=> import('./../component/contact-list/contact-list.component').then(m=> m.ContactListComponent)},

    //{path:'addCustomer',loadComponent:()=> import('./../component/customer-add/customer-add.component').then(m=> m.CustomerAddComponent)}
];
