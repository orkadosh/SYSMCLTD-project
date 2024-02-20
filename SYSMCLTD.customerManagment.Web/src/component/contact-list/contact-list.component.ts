import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts$!: Observable<any>; 
  @Input() customerId!:number;
  constructor(private customerService: CustomerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   
    //   this.customerId = +params['customerId'];
    // });
    this.loadContacts();
  }

  loadContacts(): void {
  this.contacts$=  this.customerService.getContacts(this.customerId)
  }
}
