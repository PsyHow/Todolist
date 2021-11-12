import axios from "axios";

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
    }
}


