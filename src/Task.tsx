import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type PropsType = {
    task: TaskType
    changeStatus: (taskId: string, isDone: boolean) => void
    changeTitle: (taskId: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: PropsType) => {

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let isDone = e.currentTarget.checked
        props.changeStatus(props.task.id, isDone)
    }, [props.changeStatus, props.task.id])

    const removeTask = useCallback(() => props.removeTask(props.task.id), [props.removeTask, props.task.id])

    const changeTitle = useCallback((title: string) => {
        props.changeTitle(props.task.id, title)
    }, [props.changeTitle, props.task.id])

    return (
        <ListItem style={{padding: '0px'}}
                  className={!props.task.isDone ? "notCompleted" : ""}>
            <Checkbox
                color={"primary"}
                size={"small"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={props.task.title} changeTitle={changeTitle}/>
            <IconButton aria-label={'delete'} onClick={removeTask}>
                <Delete fontSize={"small"}/>
            </IconButton>

        </ListItem>
    )
})