using System;
using Microsoft.EntityFrameworkCore;

namespace adminRun4ItTest.Models
{
    public class ProductContext: DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {
        }
        public DbSet<Product> Product { get; set; }
       

    }
}
