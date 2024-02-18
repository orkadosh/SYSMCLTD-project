using System;
using System.ComponentModel.DataAnnotations;

namespace SYSMCLTD.customerManagment.Api.model
{
	public class Customer : BaseEntity
    {
        // Additional properties specific to Customer
        [Required]
        public string fullName { get; set; }
        [Required]
        public string CustomerNumber { get; set; }

        public virtual ICollection<Contact> Contacts { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }

    }
}

