// Importa funciones de validación de email y password
import { validateEmail, validatePassword } from './validation.js';

// Interfaz para el usuario
interface User {
    id?: number;
    email?: string;
    password: string;
}

// Obtiene y muestra la lista de usuarios
async function renderUserList(usersToDisplay?: User[]): Promise<void> {
    const response = await fetch('/Api/UserApi');
    const users: User[] = usersToDisplay ?? await response.json();
    const userListElement = document.getElementById('user-list') as HTMLUListElement;
    userListElement.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `Id: ${user.id}, Correo: ${user.email}, Password: ${user.password}`;
        userListElement.appendChild(li);
    });
}

// Agrega un usuario usando la API
async function addUserApi(email: string, password: string): Promise<void> {
    const response = await fetch('/Api/UserApi', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        await renderUserList();
    }
}

// Valida el formulario de usuario
function validateForm(email: string, password: string): boolean {
    return validateEmail(email) && validatePassword(password);
}

// Muestra mensajes de error de validación en el formulario
function showValidationErrors(email: string, password: string, emailError: HTMLSpanElement, passwordError: HTMLSpanElement): void {
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
async function setupAddUserForm(): Promise<void> {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const emailError = document.getElementById('email-error') as HTMLSpanElement;
    const passwordError = document.getElementById('password-error') as HTMLSpanElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email')?.toString().trim() || '';
        const password = formData.get('password')?.toString().trim() || '';

        showValidationErrors(email, password, emailError, passwordError);

        if (validateForm(email, password)) {
            await addUserApi(email, password);
            form.reset();
        }
    });
}

// Maneja la búsqueda de usuarios por email
async function setupSearchUserForm(): Promise<void> {
    const form = document.getElementById('search-form') as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email')?.toString().trim() || undefined;

        const params = new URLSearchParams();
        
        if (email) params.append('correo', email);
        const response = await fetch(`/Api/UserApi/Search?${params}`);
        const usersFound: User[] = await response.json();

        renderUserList(usersFound);
    });
}


// Inicializa la app cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderUserList(); // Carga la lista de usuarios
    setupAddUserForm(); // Configura el formulario de agregar usuario
    setupSearchUserForm(); // Configura el formulario de búsqueda
});