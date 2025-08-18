namespace aspnetcore_crud_delete.Controllers;
using aspnetcore_crud_delete.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("Api/[controller]")]
public class TaskApiController : ControllerBase
{
    private readonly ListDbContext _context;
    public TaskApiController(ListDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = _context.TaskLists.ToList();
        return Ok(tasks);
    }
    [HttpPost]
    public IActionResult CreateTask(TaskList task)
    {
        _context.TaskLists.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id });
    }
    [HttpDelete("{id}")]
    public IActionResult DelateTask(int id)
    {
        var task = _context.TaskLists.Find(id);
        if (task != null)
        {
            
            _context.TaskLists.Remove(task);
            _context.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }

    
    


    



}