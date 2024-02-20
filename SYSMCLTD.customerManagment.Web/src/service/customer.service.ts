import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  getAddress(customerId: any) {
    
    // Include the headers in the request
    const headers = {
     'Content-Type': 'application/json',
   };
     return this.http.get<any[]>(`${this.apiUrl}/customer/address/${customerId}`,{headers}).pipe(catchError(this.handleError))
  }
  deleteCustomer(customerId: number | undefined) {
    
    // Include the headers in the request
    const headers = {
     'Content-Type': 'application/json',
   };
     return this.http.delete(`${this.apiUrl}/customer/${customerId}`,{headers}).pipe(catchError(this.handleError));
  }


  updateCustomer(customer:any) {
    
    // Include the headers in the request
    const headers = {
     'Content-Type': 'application/json',
   };
     return this.http.put(`${this.apiUrl}/customer/${customer.id}`,customer,{headers}).pipe(catchError(this.handleError));
  }
  addCustomer(customer: any) {
    
    // Include the headers in the request
    const headers = {
     'Content-Type': 'application/json',
   };
     return this.http.post(`${this.apiUrl}/customer/`,customer,{headers}).pipe(catchError(this.handleError));
  }
  addContact(contact: any): Observable<any> {
    
   // Include the headers in the request
   const headers = {
    'Content-Type': 'application/json',
  };
    return this.http.post(`${this.apiUrl}/customer/contacts`,contact,{headers}).pipe(catchError(this.handleError))
  }

  getContacts(customerId:number): Observable<any> {
    
   // Include the headers in the request
   const headers = {
    'Content-Type': 'application/json',
  };
    return this.http.get<any[]>(`${this.apiUrl}/customer/contacts/${customerId}`,{headers}).pipe(catchError(this.handleError))
  }
  getCustomer(customerId: number) : Observable<any>{
      // Include the headers in the request
  const headers = {
    'Content-Type': 'application/json',
  };
    return this.http.get<any[]>(`${this.apiUrl}/customer/${customerId}`,{headers}).pipe(catchError(this.handleError))
  }

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:7094/api';

  fetchCustomers(): Observable<any> {
    

  // Include the headers in the request
  const headers = {
    'Content-Type': 'application/json',
  };
    return this.http.get<any[]>(`${this.apiUrl}/customer/customers`,{headers}).pipe(catchError(this.handleError))
  } 



  handleError(error:any){
    
    console.log(error);
    alert(error?.error?.message);
    return throwError(() => new Error('error.message'));
  }

  
}
