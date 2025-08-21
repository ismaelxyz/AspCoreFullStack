using Microsoft.AspNetCore.Mvc;
public class UserController : Controller
{
    [HttpGet]
    public IActionResult Home()
    {
        return View();
    }

}