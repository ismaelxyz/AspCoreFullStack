using Microsoft.AspNetCore.Mvc;
namespace aspnetcore_crud_delete.Controllers;

public class TaskController : Controller
{
    [HttpGet]
    public IActionResult Home()
    {
        return View();
    }

}