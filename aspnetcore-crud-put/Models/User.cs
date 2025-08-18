using System.ComponentModel.DataAnnotations;
namespace aspnetcore_crud_put.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    public string? Name { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
}