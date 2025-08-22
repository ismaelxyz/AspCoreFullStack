var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/APi/UserApi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (response.ok) {
            yield getUsers();
        }
    });
}
function getUsers(usersToShow) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = usersToShow !== null && usersToShow !== void 0 ? usersToShow : yield (yield fetch('/APi/UserApi')).json(); //estudiar esta linea
        const userlist = document.getElementById('user-list');
        userlist.innerHTML = ''; // Clear existing list
        users.forEach(u => {
            const li = document.createElement('li');
            li.textContent = `Id: ${u.id},Nombre: ${u.name} , Email: (${u.email})`;
            userlist.appendChild(li);
        });
    });
}
function initUserFormCreate() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('user-form-create');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            yield createUser(name, email, password);
            form.reset();
        }));
    });
}
function initUserForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('user-form');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            e.preventDefault();
            const formData = new FormData(form);
            const idValue = (_a = formData.get('id')) === null || _a === void 0 ? void 0 : _a.toString().trim(); //estudiar lo de ?.toString().trim()
            const nameValue = (_b = formData.get('name')) === null || _b === void 0 ? void 0 : _b.toString().trim(); //estudiar lo de ?.toString().trim()
            const id = idValue ? parseInt(idValue, 10) : undefined; //estudiar esta linea 
            const name = nameValue && nameValue.length > 0 ? nameValue : undefined; //estudiar esta linea 
            const params = new URLSearchParams(); //estudiar esta linea
            if (id)
                params.append('id', id.toString()); //estudiar esta linea
            if (name)
                params.append('name', name); //estudiar esta linea
            const response = yield fetch(`/APi/UserApi/Search?${params.toString()}`); //estudiar por que se pone paramas.ToString()
            const filteredUsers = yield response.json();
            getUsers(filteredUsers); //estudiar esta linea de por que se envia como parametro filteredUsers
        }));
    });
}
document.addEventListener("DOMContentLoaded", () => {
    getUsers();
    initUserFormCreate();
    initUserForm();
});
export {};
//# sourceMappingURL=user.api.js.map