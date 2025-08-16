namespace aspnetcore_crud_delete.Controllers;
using aspnetcore_crud_delete.Data;

public class TaskApiController
{
    private readonly ListDbContext _context;
    public TaskApiController(ListDbContext context)
    {
        _context = context;
    }



}