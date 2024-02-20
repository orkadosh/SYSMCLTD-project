import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {
  /**
   *
   */
  @Input() customer!:any
  addresses$!:Observable<any>;
  constructor(private customerService:CustomerService ) {
    
  }
  ngOnInit(): void {
   this.getAddress();
  }
  getAddress(){
  this.addresses$= this.customerService.getAddress(this.customer.id);
  }
}
