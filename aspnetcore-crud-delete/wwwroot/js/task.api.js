var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//funcion para obtener las tareas
function GetTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/TaskApi');
        const task = yield response.json(); //repasar por que se pone []
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        task.forEach(t => {
            const listItem = document.createElement('li');
            listItem.textContent = `${t.title}: ${t.description}`;
            taskList.append(listItem);
        });
    });
}
function PostTask(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/Api/TaskAPi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        if (response.ok) {
            yield GetTasks();
        }
    });
}
//funcion para eliminar una tarea
function DeleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield fetch('/Api/TaskApi', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (reponse.ok) {
            yield GetTasks();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    GetTasks();
    const form = document.getElementById('task-form');
    form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const formData = new FormData(form);
        const id = formData.get('id');
        yield DeleteTask(Number(id));
        yield GetTasks();
    }));
});
export {};
//# sourceMappingURL=task.api.js.map