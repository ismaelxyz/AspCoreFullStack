namespace aspnetcore_crud_put.COntrollers;

using aspnetcore_crud_put.Models;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("API/[controller]")]
public class UserApiController : ControllerBase
{
    private readonly UserDbContext _context;
    public UserApiController(UserDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _context.Users.ToList();
        return Ok(users);
    }
    [HttpGet("Search")]
    public IActionResult SearchUser([FromQuery] int? id, [FromQuery] string? name)
    {
        IQueryable<User> query = _context.Users;
        if (id.HasValue)
        {
            query = query.Where(u => u.Id == id.Value);
        }
        if (!string.IsNullOrEmpty(name))
        {
            query = query.Where(u => u.Name != null && u.Name.Contains(name));
        }
        var users = query.ToList();
        return Ok(users);
    }
    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        if (ModelState.IsValid)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(SearchUser), user);
        }
        return BadRequest(ModelState);
    }
}
