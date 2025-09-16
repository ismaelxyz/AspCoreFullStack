using Microsoft.AspNetCore.Mvc;
namespace aspnetcore_crud_delete.Controllers;

public class TaskController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

}