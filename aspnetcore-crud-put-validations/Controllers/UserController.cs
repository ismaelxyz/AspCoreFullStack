using Microsoft.AspNetCore.Mvc;

public class UserController : Controller
{
    public IActionResult Home()
    {
        return View();
    }
}