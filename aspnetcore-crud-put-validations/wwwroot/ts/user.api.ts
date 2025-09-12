interface User {
    id?: number;
    email?: string;
    password?: string;
}

async function getUsers(): Promise<void> {
    const response = await fetch('/Api/UserApi');
    const users: User[] = await response.json();
    const list = document.getElementById('user-list') as HTMLUListElement;
    list.innerHTML = '';
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `Id: ${u.id}, Correo: ${u.email}, Password: ${u.password}`;
        list.appendChild(li);
    });
}

// Agrega múltiples usuarios
async function addUsers(users: User[]): Promise<void> {
    const response = await fetch('/Api/UserApi', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ user: users })
    });
    if (response.ok) {
        getUsers();
    }
}


async function addUser(): Promise<void> {
    const form = document.getElementById('login-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email')?.toString()!;
        const password = formData.get('password')?.toString()!;
        await addUsers([{email, password }]);
    })

}


// Llama a getUsers cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    getUsers();

})