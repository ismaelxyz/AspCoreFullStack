using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("Api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthDbContext _context;

    public AuthController(AuthDbContext context)
    {
        _context = context;
    }


    [HttpPost("google")]
    
public async Task< IActionResult> GoogleLogin([FromBody] GoogleUserRequest request)
    {
        if (request == null || request.User == null)
            return BadRequest("Invalid data");

        var user = new GoogleUserData
        {
            Sub = request.User.Sub,
            Iss = request.User.Iss,
            Azp = request.User.Azp,
            Aud = request.User.Aud,
            Email = request.User.Email,
            EmailVerified = request.User.EmailVerified,
            Name = request.User.Name,
            Picture = request.User.Picture,
            GivenName = request.User.GivenName,
            FamilyName = request.User.FamilyName,
            Exp = request.User.Exp,
            GoogleToken = request.Token
        };

        _context.GoogleAuthUsers.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuario guardado", user });
    }
    
}
