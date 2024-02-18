// CustomerService.cs

using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD.customerManagment.Api.db;
using SYSMCLTD.customerManagment.Api.model;

public class CustomerService
{
    private readonly CustomerDbContext _dbContext;

    public CustomerService(CustomerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Customer> GetAllCustomers()
    {
        return _dbContext.Customers.Where(c=>!c.IsDeleted).ToList();
    }

    public Customer GetCustomerById(int id)
    {
        return _dbContext.Customers.Find(id);
    }

    public string CreateCustomer(Customer customer)
    {
        var customerExist = _dbContext.Customers.Any(c => c.CustomerNumber == customer.CustomerNumber);
        if (!customerExist)
        {
        _dbContext.Customers.Add(customer);
        _dbContext.SaveChanges();
            return "customer created success!";
        }
        else
            return "Customer with the same customer Number already exists.";
    }

    public string UpdateCustomer(int id, Customer updatedCustomer)
    {
        var existingCustomer = _dbContext.Customers.Include(c => c.Addresses).SingleOrDefault(c=>c.Id==id);

        if (existingCustomer != null)
        {
            existingCustomer.fullName = updatedCustomer.fullName;
            existingCustomer.CustomerNumber = updatedCustomer.CustomerNumber;
            existingCustomer.IsDeleted = updatedCustomer.IsDeleted;
            existingCustomer.Addresses = updatedCustomer.Addresses;
            // Update other properties as needed
            _dbContext.SaveChanges();
            return "customer updated success!";
        }
        return "Customer updated failed.";
    }

    public void DeleteCustomer(int id)
    {
        var customer = _dbContext.Customers.Find(id);

        if (customer != null)
        {
            customer.IsDeleted = true;
            var sql = $"UPDATE Contacts SET IsDeleted = 1 WHERE CustomerId = {id}";
            _dbContext.Database.ExecuteSqlRaw(sql);
            // _dbContext.Customers.Remove(customer);
            _dbContext.SaveChanges();
        }
    }

    public  IEnumerable<Contact> GetContactsByCustomerId(int customerId)
    {
        var customer= _dbContext.Customers.Include(c => c.Contacts).SingleOrDefault(c => c.Id == customerId);
        if(customer!=null)
        return customer.Contacts.ToList();
        else
            return null;
    }

    public Customer AddContactsToCustomerId(int customerId, Contact contact)
    {
        var customer = _dbContext.Customers.Include(c => c.Contacts).SingleOrDefault(c => c.Id == customerId);

        if (customer != null)
        {           

            // Add the Contact to the customer's Contacts collection
            customer.Contacts.Add(contact);

            // Save changes to the database
            _dbContext.SaveChanges();
        }
        return customer;
    }


    public IEnumerable<Address> GetAddressByCustomerId(int customerId)
    {
        var customer = _dbContext.Customers.Include(c => c.Addresses).SingleOrDefault(c => c.Id == customerId);
        if (customer != null)
            return customer.Addresses.ToList();
        else
            return null;
    }

}
