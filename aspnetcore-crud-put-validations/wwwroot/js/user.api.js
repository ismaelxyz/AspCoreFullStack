var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importa funciones de validación de email y password
import { validateEmail, validatePassword } from './validation.js';
// Obtiene y muestra la lista de usuarios
function renderUserList(usersToDisplay) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi');
        const users = usersToDisplay !== null && usersToDisplay !== void 0 ? usersToDisplay : yield response.json();
        const userListElement = document.getElementById('user-list');
        userListElement.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Id: ${user.id}, Correo: ${user.email}, Password: ${user.password}`;
            userListElement.appendChild(li);
        });
    });
}
// Agrega un usuario usando la API
function addUserApi(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            yield renderUserList();
        }
    });
}
// Valida el formulario de usuario
function validateForm(email, password) {
    return validateEmail(email) && validatePassword(password);
}
// Muestra mensajes de error de validación en el formulario
function showValidationErrors(email, password, emailError, passwordError) {
    emailError.textContent = '';
    passwordError.textContent = '';
    // Validar email
    if (!validateEmail(email)) {
        emailError.textContent = 'Correo inválido';
    }
    // Validar password
    if (!validatePassword(password)) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
    }
}
// Configura el formulario de agregar usuario
function setupAddUserForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('login-form');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            e.preventDefault();
            const formData = new FormData(form);
            const email = ((_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString().trim()) || '';
            const password = ((_b = formData.get('password')) === null || _b === void 0 ? void 0 : _b.toString().trim()) || '';
            showValidationErrors(email, password, emailError, passwordError);
            if (validateForm(email, password)) {
                yield addUserApi(email, password);
                form.reset();
            }
        }));
    });
}
// Maneja la búsqueda de usuarios por email
function setupSearchUserForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('search-form');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            e.preventDefault();
            const formData = new FormData(form);
            const email = ((_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString().trim()) || undefined;
            const params = new URLSearchParams();
            if (email)
                params.append('correo', email);
            const response = yield fetch(`/Api/UserApi/Search?${params}`);
            const usersFound = yield response.json();
            renderUserList(usersFound);
        }));
    });
}
// Inicializa la app cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderUserList(); // Carga la lista de usuarios
    setupAddUserForm(); // Configura el formulario de agregar usuario
    setupSearchUserForm(); // Configura el formulario de búsqueda
});
//# sourceMappingURL=user.api.js.map