interface ITask {
    id: number;
    title: string;
    description: string;
}
async function GetTasks(): Promise<void> {
    const response = await fetch('/Api/TaskApi')
    const task: ITask[] = await response.json(); //repasar por que se pone []
    const taskList = document.getElementById('task-list') as HTMLUListElement;
    taskList.innerHTML = '';
    task.forEach(t => {
        const listItem = document.createElement('li');
        listItem.textContent = `${t.title}: ${t.description}`;
        taskList.append(listItem)
    });
}

document.addEventListener('DOMContentLoaded', ()=>{
    GetTasks();
})
