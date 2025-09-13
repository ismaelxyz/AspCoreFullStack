// validation.ts
// Funciones sencillas de validación para email y password
export function validateEmail(email) {
    // Validación básica de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
export function validatePassword(password) {
    // Password de al menos 6 caracteres
    return password.length >= 6;
}
//# sourceMappingURL=validation.js.map