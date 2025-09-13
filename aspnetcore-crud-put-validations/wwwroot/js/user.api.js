var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getUsers(searchUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi');
        const users = searchUser !== null && searchUser !== void 0 ? searchUser : yield response.json();
        const list = document.getElementById('user-list');
        list.innerHTML = '';
        users.forEach(u => {
            const li = document.createElement('li');
            li.textContent = `Id: ${u.id}, Correo: ${u.email}, Password: ${u.password}`;
            list.appendChild(li);
        });
    });
}
// Agrega múltiples usuarios
function addUsers(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            yield getUsers();
        }
    });
}
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            e.preventDefault();
            const formData = new FormData(form);
            const email = (_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString().trim();
            const password = (_b = formData.get('password')) === null || _b === void 0 ? void 0 : _b.toString().trim();
            yield addUsers(email, password);
            form.reset();
        }));
    });
}
function searchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('search-form');
        form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            e.preventDefault();
            const formData = new FormData(form);
            const emailValue = (_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString().trim();
            const email = emailValue ? emailValue : undefined;
            const params = new URLSearchParams();
            if (email)
                params.append('correo', email);
            const response = yield fetch(`/Api/UserApi/Search?${params}`);
            const searchUser = yield response.json();
            getUsers(searchUser);
        }));
    });
}
// Llama a getUsers cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
    addUser();
    searchUser();
});
export {};
//# sourceMappingURL=user.api.js.map