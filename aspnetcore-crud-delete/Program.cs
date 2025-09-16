using aspnetcore_crud_delete.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
// Configura el servicio de Entity Framework Core con SQL Server
builder.Services.AddDbContext<ListDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agrega soporte para controladores API y vistas
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Deshabilita redirección HTTPS en desarrollo/Docker
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Habilita el uso de archivos estáticos
app.UseStaticFiles();

// Habilita el mapeo de rutas para los controladores API
app.MapControllers();

// Habilita el mapeo de rutas para vistas
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Task}/{action=Index}/{id?}");

// curl -i http://172.18.0.3:8080/Api/TaskApi
app.Run();

