#nullable disable
using Microsoft.EntityFrameworkCore;
using TrumpVerseApi.Models; 

public class TrumpContext : DbContext
{
   public TrumpContext(DbContextOptions<TrumpContext> options):base(options){}

      public DbSet<TrumpStaff> Staff { get; set; }
}