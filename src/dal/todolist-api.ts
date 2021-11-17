import axios from "axios";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type RootResponseType<T = {}> = {
    resultCode: number
    fieldsError: Array<string>
    messages: Array<string>
    data: T
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TaskResponseType = {
    Items: TaskType[]
    totalCount: number
    error: string
}
type UpdateTaskType = {
    title: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': 'b7b7629a-058d-4df6-866c-6165a8a8aade'
    }
})


export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<RootResponseType<{ item: TodoType }>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<RootResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(params: { todolistId: string, title: string }) {
        return instance.put<RootResponseType>(`/todo-lists/${params.todolistId}`, {title: params.title})
    },
    getTask(todolistId: string) {
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<RootResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}


