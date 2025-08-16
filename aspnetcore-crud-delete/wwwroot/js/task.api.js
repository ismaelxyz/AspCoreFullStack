var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
document.addEventListener('DOMContentLoaded', () => {
    GetTasks();
});
export {};
//# sourceMappingURL=task.api.js.map