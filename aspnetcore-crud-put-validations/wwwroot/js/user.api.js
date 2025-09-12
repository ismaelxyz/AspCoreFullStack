var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi');
        const users = yield response.json();
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
function addUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/UserApi', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user: users })
        });
        if (response.ok) {
            getUsers();
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
            const email = (_a = formData.get('email')) === null || _a === void 0 ? void 0 : _a.toString();
            const password = (_b = formData.get('password')) === null || _b === void 0 ? void 0 : _b.toString();
            yield addUsers([{ email, password }]);
        }));
    });
}
// Llama a getUsers cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    getUsers();
});
export {};
//# sourceMappingURL=user.api.js.map