import { Component, OnInit } from '@angular/core';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CustomerAddComponent],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.scss'
})
export class CustomerUpdateComponent extends CustomerAddComponent implements OnInit {

  customer:any;
    constructor(private route: ActivatedRoute,override  fb: FormBuilder, override http: HttpClient,override customerService:CustomerService,override router: Router) {
        super(fb,http,customerService,router)
    }
  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      
      const customerState = JSON.parse(params['customer']);
      console.log('Received object:', customerState);
      this.customer=customerState.state.customer;
      this.getAddress();

      this.customerForm.patchValue({
        // Update the appropriate form control with the value from the child
        // For example, if you have a control named 'childValue':
        fullName: this.customer.fullName,
        customerNumber: this.customer.customerNumber,
        addAddress: this.customer.addAddress,

      });
    
    });
    
  }
  updateAdress(array:any[]){
    
    const formControls = array.map((address:any) => ((this.customerForm.get('addresses')) as FormArray).controls.push(this.fb.group(address)));
    
  }
   childValues(arrayName:string): FormArray {
    return this.customerForm.get(arrayName) as FormArray;
  }

  getAddress(){
    this.customerService.getAddress(this.customer.id).subscribe((result:any)=>{
      if(result){
        
        let addressForm= this.childValues('addresses');
        this.updateAdress(result)
       const formval=  this.customerForm.value;
      }
    },error=>{
      
    });
  }

}
