// wwwroot/ts/task.api.ts
interface ITask {
    id: number;
    title: string;
    description: string;
}
//funcion para obtener las tareas
async function GetTasks(): Promise<void> {
    const response = await fetch('/Api/TaskApi')
    const task: ITask[] = await response.json(); //repasar por que se pone []
    const taskList = document.getElementById('task-list') as HTMLUListElement;
    taskList.innerHTML = '';
    task.forEach(t => {
        const listItem = document.createElement('li');
        listItem.textContent = ` ${t.id}/${t.title}: ${t.description}`;
        taskList.append(listItem)
    });
}
async function PostTask(title: string, description: string): Promise<void> {
    const response = await fetch('/Api/TaskAPi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });
    if (response.ok) {
        await GetTasks();
    }
}
//funcion para eliminar una tarea
async function DeleteTask(id: number): Promise<void> {
    const reponse = await fetch(`/Api/TaskApi/${id}`, { //por que se pone las ``
        method: 'DELETE',
    });
    if (reponse.ok) {
        await GetTasks();

    }
}

document.addEventListener('DOMContentLoaded', () => {
    GetTasks();
    const form = document.getElementById('task-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {  //ver por que se pone async y =>
        e.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');
        await DeleteTask(Number(id));
    })
    const addForm = document.getElementById('add-task-form') as HTMLFormElement;
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addForm);
        const title = formData.get('title');
        const description = formData.get('description');
        await PostTask(String(title), String(description));
        addForm.reset();

    })
})

