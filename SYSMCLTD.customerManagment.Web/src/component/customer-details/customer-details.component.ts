// src/app/customer-details/customer-details.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { Tab, TabsComponent } from '../tabs/tabs.component';
import { CustomerService } from '../../service/customer.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.1.html',
 // imports:[],
 imports:[CommonModule, RouterModule,TabsComponent,ContactListComponent,AddressComponent],
  standalone:true,
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild('tabsComponent') tabsComponent!: TabsComponent;
  customerId: number|undefined;
  customer:any|undefined;
  tabs: Tab[] = [
    { title: 'Customer Details' },
    { title: 'Address' },
    { title: 'Contacts' },
    // Add more tabs as needed
  ];
  constructor(private customerService:CustomerService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // Get the customer ID from the route parameter
    this.route.params.subscribe((params) => {
      this.customerId = +params['id'];
      this.customerService.getCustomer(this.customerId ).subscribe((customer:any)=>{
        
        this.customer= customer;
      })
      // Fetch customer details, contacts, and address details based on the ID
      // You can implement a service to fetch data from your API
    });
  }


 
  updateCustomer(){
    const navigationExtras: NavigationExtras = {
      state: {
        customer: this.customer
      }
    };
    this.router.navigate(['/updateCustomer',JSON.stringify(navigationExtras)]);
  }
  deleteCustomer(){
    this.customerService.deleteCustomer(this.customerId ).subscribe((customer:any)=>{
      
      alert('customer delete success!');
      this.router.navigate(['/']);
    })
  }
  addContacts(){
    
    this.router.navigate(['/addContact',this.customer.id]);
  }
}
