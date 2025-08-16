namespace aspnetcore_crud_delete.Data;
using Microsoft.EntityFrameworkCore;
public class ListDbContext : DbContext
{
    public ListDbContext(DbContextOptions<ListDbContext> options) : base(options)
    {
    }

    public DbSet<TaskList> TaskLists { get; set; } = null!;
}