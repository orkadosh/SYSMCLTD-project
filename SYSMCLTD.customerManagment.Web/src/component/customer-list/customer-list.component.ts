// customer-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../../service/customer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app/app-routing.module';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  standalone:true,
  imports:[CommonModule,RouterModule,RouterLink],
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers$:Observable<any|undefined>= this.customerService.fetchCustomers();;

  constructor(private customerService:CustomerService,private router: Router) { }

  ngOnInit(): void {

  }
  showCustomerDetails(customerId:number){
    
    this.router.navigate(['/customer-details', customerId]);

  }

 
}
