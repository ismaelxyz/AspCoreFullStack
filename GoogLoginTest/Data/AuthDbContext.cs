using Microsoft.EntityFrameworkCore;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
    {

    }
    public DbSet<GoogleUserData> GoogleAuthUsers { get; set; }
}