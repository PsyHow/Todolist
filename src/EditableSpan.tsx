import React, {useState, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type EditablePropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditablePropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    return (
        editMode ? <TextField value={title}
                              style={{width: '100px'}}
                              size={"small"}
                              autoFocus={true}
                              onChange={changeTitle}
                              onBlur={offEditMode}>

            </TextField>
            : <span style={{wordWrap: 'break-word', maxWidth: '100px'}} onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;