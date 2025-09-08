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
        const response = yield fetch('/Api/UserApi', {
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
        const response = yield fetch('/Api/UserAPi');
        const users = usersToShow !== null && usersToShow !== void 0 ? usersToShow : yield response.json();
        const userlist = document.getElementById('user-list');
        userlist.innerHTML = ''; //limpiar lista antes de actualizarla
        users.forEach(u => {
            const li = document.createElement('li');
            li.textContent = `Id: ${u.id},Nombre: ${u.name} , Email: ${u.email}`;
            userlist.appendChild(li);
        });
    });
}
function initUserFormCreate() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('user-form-create');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            e.preventDefault();
            const formData = new FormData(form);
            const name = (_a = formData.get('name')) === null || _a === void 0 ? void 0 : _a.toString();
            const email = (_b = formData.get('email')) === null || _b === void 0 ? void 0 : _b.toString();
            const password = (_c = formData.get('password')) === null || _c === void 0 ? void 0 : _c.toString();
            yield createUser(name.trim(), email.trim(), password.trim());
            form.reset();
        }));
    });
}
function initUserSearchForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('user-search-form');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            e.preventDefault();
            const formData = new FormData(form);
            const idValue = (_b = (_a = formData.get('id')) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.trim(); //trim:Elimina espacios en blanco al inicio y final.
            const nameValue = (_d = (_c = formData.get('name')) === null || _c === void 0 ? void 0 : _c.toString()) === null || _d === void 0 ? void 0 : _d.trim();
            const id = idValue ? idValue : undefined;
            const name = nameValue && nameValue.length > 0 ? nameValue : undefined;
            const params = new URLSearchParams();
            if (id)
                params.append('id', id);
            if (name)
                params.append('name', name);
            const response = yield fetch(`/Api/UserApi/Search?${params}`);
            const filteredUsers = yield response.json();
            getUsers(filteredUsers);
        }));
    });
}
document.addEventListener("DOMContentLoaded", () => {
    getUsers();
    initUserFormCreate();
    initUserSearchForm();
});
export {};
//# sourceMappingURL=user.api.js.map