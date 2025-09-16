using Microsoft.AspNetCore.Mvc;


namespace Prueba.Controllers;

/// <summary>
/// Controlador para la página principal de la aplicación.
/// </summary>
public class HomeController : Controller
{
    /// <summary>
    /// Muestra la vista principal de la aplicación.
    /// </summary>
    /// <returns>Vista principal.</returns>
    public IActionResult Index()
    {
        return View();
    }
}
