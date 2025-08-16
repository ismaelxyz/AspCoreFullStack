using aspnetcore_crud_delete.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Configura el servicio de Entity Framework Core con SQL Server
builder.Services.AddDbContext<ListDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Agrega soporte para controladores API y vistas
builder.Services.AddControllersWithViews();
var app = builder.Build();
//habilita el uso de HTTPS
app.UseHttpsRedirection();
//habilita el uso de archivos estáticos
app.UseStaticFiles();
// Habilita el mapeo de rutas para los controladores API
app.MapControllers();
//habilita el mapeo de rutas para vistas
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=User}/{action=Index}/{id?}");


app.Run();

