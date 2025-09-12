using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("Api/[controller]")]
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
        var user = _context.Users;
        return Ok(user);
    }
    [HttpPost]
    public IActionResult CreateUsers(User user)
    {
        if (ModelState.IsValid)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUsers), user);
        }
        return BadRequest(ModelState);
    }
    [HttpGet("Search")]
    public IActionResult SearchUsers([FromQuery] string? correo, [FromQuery] string? password)
    {
        IQueryable<User> query = _context.Users;
        if (!string.IsNullOrWhiteSpace(correo))
        {
            query = query.Where(u => u.Email != null && u.Email.Contains(correo));
        }
        var users = query.ToList();
        return Ok(users);
        
    }
    
        
    


}