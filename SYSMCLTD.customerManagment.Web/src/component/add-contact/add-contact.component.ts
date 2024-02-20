import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactForm!: FormGroup; 
  customerId!: number;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private customerService:CustomerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      
      this.customerId = +params['customerId'];

    });
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      officeNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      
      console.log('Contact added:', this.contactForm.value);
      const contactDetails=this.contactForm.value;
      const contact= {customerId:this.customerId, ...contactDetails };
      this.customerService.addContact(contact).subscribe(result=>{},error=>{})
      // Reset the form
      this.contactForm.reset();
    }
  }

}
