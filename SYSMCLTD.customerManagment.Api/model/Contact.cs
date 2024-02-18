using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SYSMCLTD.customerManagment.Api.model
{
	public class Contact :BaseEntity
	{
            [Required]
            public string FullName { get; set; }
            public string OfficeNumber { get; set; }
            public string Email { get; set; }
            [Required]
            public int CustomerId { get; set; }
            [JsonIgnore]
            public Customer Customer { get; set; }
    }
}

