import React, {useState} from 'react'
import {todolistApi} from "../dal/todolist-api";

export default {
    title: 'API'
}

// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistApi.getTodos()
//             .then(res => setState(res.data))
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolist = () => {
        todolistApi.getTodos()
            .then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolist}>get todolist</button>
        </div>
    </div>
}

// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const title = 'Wanted'
//         todolistApi.createTodo(title)
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        const title = 'Wanted'
        todolistApi.createTodo(title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}

// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '8f175436-2173-4a13-a4fc-f544114fdbc7'
//         todolistApi.deleteTodo(todolistId)
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        const todolistId = '8f175436-2173-4a13-a4fc-f544114fdbc7'
        todolistApi.deleteTodo(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}

// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '8f1e460a-8f1a-4904-89d9-9e28be93b347'
//         const title = 'Buzinga23'
//         todolistApi.updateTodoTitle({todolistId, title})
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {
        todolistApi.updateTodoTitle({todolistId, title})
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    </div>
}

// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '7b8799dd-4de3-4d62-86e2-4da6e1cafbbb'
//         todolistApi.getTask(todolistId)
//             .then(res => setState(res.data))
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTask = () => {
        todolistApi.getTask(todolistId)
            .then(res => setState(res.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={getTask}>get task</button>
        </div>
    </div>
}

// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '7b8799dd-4de3-4d62-86e2-4da6e1cafbbb'
//         const title = 'Third Task'
//         todolistApi.createTask(todolistId, title)
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistApi.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = 'd424b694-d42b-4c5d-8586-2677203e1c57'
//         const taskId = '7040af89-d0e3-4eeb-9af6-7cafd911b395'
//         todolistApi.deleteTask(todolistId, taskId)
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '7b8799dd-4de3-4d62-86e2-4da6e1cafbbb'
//         const taskId = '02da426d-e266-41b8-8c9f-960946129565'
//         const title = 'Update Third Task'
//         todolistApi.updateTask(todolistId, taskId, {title})
//             .then(res => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        todolistApi.updateTask(todolistId, taskId, {title})
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <input placeholder={'title'} value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTask}>update Task</button>
        </div>
    </div>
}

