using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD.customerManagment.Api.model;

namespace SYSMCLTD.customerManagment.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class customerController : Controller
    {
        private readonly CustomerService _customerService;

        public customerController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/customers
        [HttpGet("customers")]
        public IActionResult GetAllCustomers()
        {
            var customers = _customerService.GetAllCustomers();
            return Ok(customers);
        }

        // GET: api/customers/{id}
        [HttpGet("{id}")]
        public IActionResult GetCustomerById(int id)
        {
            var customer = _customerService.GetCustomerById(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // POST: api/customers
        [HttpPost]
        public IActionResult CreateCustomer(Customer customer)
        {
           var result= _customerService.CreateCustomer(customer);
            if(result.Contains("success"))
            return CreatedAtAction(nameof(CreateCustomer), new { id = customer.Id }, customer);
            else
            {
             return Conflict(new { message = result });
            }
        }

        // PUT: api/customers/{id}v
        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, Customer updatedCustomer)
        {
           var result= _customerService.UpdateCustomer(id, updatedCustomer);
            if (result.Contains("success"))
                return Ok(new{ message=result});
            else
            {
                return NoContent();
            }
        }

        // DELETE: api/customers/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            _customerService.DeleteCustomer(id);
            return NoContent();
        }


        [HttpGet("contacts/{customerId}")]
        public IActionResult GetContactsByCustomerId(int customerId)
        {
           var contacts= _customerService.GetContactsByCustomerId(customerId);
            return Ok(contacts);
         
        }
        [HttpPost("contacts")]
        public IActionResult AddContactsToCustomerId(Contact contact)
        {
             _customerService.AddContactsToCustomerId(contact.CustomerId, contact);
            return NoContent();
        }

        [HttpGet("address/{customerId}")]
        public IActionResult GetAdressByCustomerId(int customerId)
        {
            var address = _customerService.GetAddressByCustomerId(customerId);
            return Ok(address);
        }
    }
}