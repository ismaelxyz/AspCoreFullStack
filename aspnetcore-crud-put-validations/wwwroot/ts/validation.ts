// validation.ts
// Funciones sencillas de validación para email y password

export function validateEmail(email: string): boolean {
    // Validación básica de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validatePassword(password: string): boolean {
    // Password de al menos 6 caracteres
    return password.length >= 6;
}
