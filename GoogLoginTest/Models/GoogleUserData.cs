using System.ComponentModel.DataAnnotations;

public class GoogleUserData
{
    [Key]
    public string Sub { get; set; } = string.Empty; // Usar 'Sub' como clave primaria
    public string? Iss { get; set; }
    public string? Azp { get; set; }
    public string? Aud { get; set; }
    public string? Email { get; set; }
    public bool EmailVerified { get; set; }
    public string? Name { get; set; }
    public string? Picture { get; set; }
    public string? GivenName { get; set; }
    public string? FamilyName { get; set; }
    public long Exp { get; set; }     // Expiración en Unix 
    // Opcional: guardar el token
    public string GoogleToken { get; set; } = string.Empty;
}