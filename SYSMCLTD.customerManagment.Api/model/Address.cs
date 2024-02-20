using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SYSMCLTD.customerManagment.Api.model
{
    public class Address : BaseEntity
    {
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        public int CustomerId { get; set; }
        [JsonIgnore]
        public Customer Customer { get; set; }
    }
}

