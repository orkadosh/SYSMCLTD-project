using System;
using System.ComponentModel.DataAnnotations;

namespace SYSMCLTD.customerManagment.Api.model
{
	public class BaseEntity
	{
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        public DateTime Created { get; set; }
    }
}

