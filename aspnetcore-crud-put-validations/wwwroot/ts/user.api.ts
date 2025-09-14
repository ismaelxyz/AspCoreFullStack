import { validateEmail, validatePassword } from './validation.js';

interface User {
    id?: number;
    email?: string;
    password: string;
}

async function getUsers(searchUser?: User[]): Promise<void> {
    const response = await fetch('/Api/UserApi');
    const users: User[] = searchUser ?? await response.json();
    const list = document.getElementById('user-list') as HTMLUListElement;
    list.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `Id: ${u.id}, Correo: ${u.email}, Password: ${u.password}`;
        list.appendChild(li);
    });
}

// Agrega múltiples usuarios
async function addUsers(email: string, password: string): Promise<void> {
    const response = await fetch('/Api/UserApi', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        await getUsers();
    }
}

function validateForm(email: string, password: string): boolean {
    return validateEmail(email) && validatePassword(password);
}

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

async function addUser(): Promise<void> {
    const form = document.getElementById('login-form') as HTMLFormElement;
    const emailError = document.getElementById('email-error') as HTMLSpanElement;
    const passwordError = document.getElementById('password-error') as HTMLSpanElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email')?.toString().trim() || ''!;
        const password = formData.get('password')?.toString().trim() || ''!;

        showValidationErrors(email, password, emailError, passwordError);

        if (validateForm(email, password)) {

        }

        await addUsers(email, password);
        form.reset();
    });
}

async function searchUser(): Promise<void> {
    const form = document.getElementById('search-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const emailValue = formData.get('email')?.toString().trim()!;
        const email = emailValue ? emailValue : undefined;
        const params = new URLSearchParams();
        if (email) params.append('correo', email);
        const response = await fetch(`/Api/UserApi/Search?${params}`);
        const searchUser: User[] = await response.json();
        getUsers(searchUser);


    })
}


// Llama a getUsers cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    addUser();
    searchUser();

})