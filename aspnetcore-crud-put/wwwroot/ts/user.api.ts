interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
async function createUser(name: string, email: string, password: string): Promise<void> {
    const response = await fetch('/API/UserApi', {
        method: 'POST',

        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });
    if (response.ok) {
        await getUsers();
    }
}
async function getUsers(usersToShow?: User[]) { //estudiar esta linea
    const response = await fetch('/API/UserAPi');
    const users:User[] = usersToShow ?? await response.json(); 
    const userlist = document.getElementById('user-list') as HTMLUListElement
    userlist.innerHTML = ''; // Clear existing list
    users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `Id: ${u.id},Nombre: ${u.name} , Email: (${u.email})`;
        userlist.appendChild(li)
    })

}


async function initUserFormCreate() {
    const form = document.getElementById('user-form-create') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await createUser(name, email, password);
        form.reset();

    })
}


async function initUserForm() {
    const form = document.getElementById('user-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const idValue = formData.get('id')?.toString().trim(); //estudiar lo de ?.toString().trim()
        const nameValue = formData.get('name')?.toString().trim();//estudiar lo de ?.toString().trim()

        const id = idValue ? parseInt(idValue, 10) : undefined; //estudiar esta linea 
        const name = nameValue && nameValue.length > 0 ? nameValue : undefined;//estudiar esta linea 

        const params = new URLSearchParams();//estudiar esta linea
        if (id) params.append('id', id.toString());//estudiar esta linea
        if (name) params.append('name', name); //estudiar esta linea
        const response = await fetch(`/API/UserApi/Search?${params.toString()}`); //estudiar por que se pone paramas.ToString()
        const filteredUsers: User[] = await response.json();
        getUsers(filteredUsers); //estudiar esta linea de por que se envia como parametro filteredUsers



    });

}

document.addEventListener("DOMContentLoaded", () => {
    getUsers();
    initUserFormCreate();
    initUserForm();
});
