using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class ValidationEmailAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (string.IsNullOrWhiteSpace(value?.ToString()))
        {
            return new ValidationResult("El correo es obligatorio.");
        }

        string email = value.ToString()!;
        if (Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        {
            return ValidationResult.Success;
        }
        return new ValidationResult("El correo no es válido.");

    }

}