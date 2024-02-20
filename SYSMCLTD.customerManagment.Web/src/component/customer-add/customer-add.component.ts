import { Component, Input, input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';


export enum operationType{
  create=1,
  update=2
}

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent {
  @Input() customerForm!: FormGroup;
  @Input() operationType!:operationType;
  @Input()  customerId!:number;

  constructor(protected fb: FormBuilder, protected http: HttpClient,protected customerService:CustomerService,protected router: Router) {
    
    if(!this.customerForm){
      this.customerForm = this.fb.group({
        fullName: ['', Validators.required],
        customerNumber: ['', [Validators.required, this.customerNumberValidator]],
        addresses: this.fb.array([]) // Initialize with an empty array
      });
    }
  }
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required]
    }));
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }



  onSubmit(): void {
    
    if (this.customerForm.valid) {
          
          console.log('Contact added:', this.customerForm.value);
          const newCustomer=this.customerForm.value;
         if(!this.operationType ||this.operationType && this.operationType ==1)
          this.customerService.addCustomer(newCustomer).subscribe((result:any)=>{
            if(result){

              alert('customer was added successfully');
              this.router.navigate(['/customer-details',result.id]); 
            }
            else{
              alert(result.Message)
              this.customerForm.reset();
            }
          }
        )
        else{
          
          const request = {id:this.customerId,...newCustomer};
          this.customerService.updateCustomer(request).subscribe((result:any)=>{
            if(result){
              alert('customer was updated successfully');
              this.router.navigate(['/customer-details',result.id]); 
            }
            else{
              alert(result.Message)
              this.customerForm.reset();
            }
          }
        )
        }
      }
  }

  customerNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;

    // Check if the value is a 9-digit number
    if (/^\d{9}$/.test(value)) {
      return null;  // Validation passes
    } else {
      return { 'invalidCustomerNumber': true };  // Validation fails
    }
  }
}
