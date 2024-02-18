using System;
using Microsoft.EntityFrameworkCore;
using SYSMCLTD.customerManagment.Api.model;

namespace SYSMCLTD.customerManagment.Api.db
{
	public class CustomerDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options)
        {
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Customer>(entity =>
            {
                // Set the table name
                entity.ToTable("Customers");

                // Set the primary key
                entity.HasKey(c => c.Id);

                // Configure the Id property as an identity column
                entity.Property(c => c.Id).UseIdentityColumn();

                // Other configurations for Customer entity...
            });



            modelBuilder.Entity<Customer>()
            .Property(e => e.IsDeleted)
            .HasDefaultValue(false);

            modelBuilder.Entity<Customer>()
           .Property(e => e.Created)
           .HasDefaultValueSql("GETUTCDATE()");

            // Other configurations...


            // Configure Order entity
            modelBuilder.Entity<Contact>(entity =>
            {
                // Set the table name
                entity.ToTable("Contacts");

                // Set the primary key
                entity.HasKey(c => c.Id);

                // Configure the Id property as an identity column
                entity.Property(c => c.Id).UseIdentityColumn();
                // entity.Property(c => c.OfficeNumber).IsRequired(false);
                // entity.Property(c => c.Email).IsRequired(false);
                entity.Property(e => e.Created)
                   .HasDefaultValueSql("GETUTCDATE()");

                // Other configurations for Contact entity...
                entity.HasOne(c => c.Customer).WithMany(c => c.Contacts).HasForeignKey(c => c.CustomerId);

            });
            // Configure Order entity
            modelBuilder.Entity<Address>(entity =>
            {
                // Set the table name
                entity.ToTable("Address");

                // Set the primary key
                entity.HasKey(c => c.Id);

                // Configure the Id property as an identity column
                entity.Property(c => c.Id).UseIdentityColumn();
                entity.Property(e => e.Created)
                 .HasDefaultValueSql("GETUTCDATE()");
                // Other configurations for Address entity...
                entity.HasOne(a => a.Customer).WithMany(a => a.Addresses).HasForeignKey(c => c.CustomerId);

            });


            base.OnModelCreating(modelBuilder);
        }
    }
}

