export interface Task {
    id: number;
    action: string;
    done: boolean;
}

let nextId = 1;

const tasks: Task[] = [
    { id: nextId++, action: "practice javascript", done: false },
    { id: nextId++, action: "clean kitchen", done: false },
    { id: nextId++, action: "buy milk", done: true },
    { id: nextId++, action: "work out", done: false }
];

function findTaskIndex(id: number) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return i;
        }
    }
    return -1;
}

export function getAllTasks() {
    return tasks;
}

export function getTaskById(id: number): Task|undefined {
    const index: number = findTaskIndex(id);
    if (index < 0) {
        return undefined;
    }
    return tasks[index];
}

export function addTask(action: string, done: boolean): Task {
    const task: Task = { id: nextId++, action, done };
    tasks.push(task);
    return task;
}

export function removeAllTasks(): void {
    tasks.splice(0);
}

export function removeTask(task: Task): void {
    const index: number = findTaskIndex(task.id);
    if (index < 0) {
        return;
    }
    tasks.splice(index, 1);
}