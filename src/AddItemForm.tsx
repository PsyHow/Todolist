import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormTypes = {
    addItem:(title:string)=>void
}

export const AddItemForm = React.memo( (props:AddItemFormTypes) => {

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState<string>("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === "Enter") {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError('Title is required!')
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                variant={"outlined"}
                label={'Enter title'}
                size={'small'}
                helperText={error}
            />
            <IconButton onClick={addItem}>
                <AddBox color={"primary"}/>
            </IconButton>
            {/*{error && <div style={{color: "red"}}>Title is required!</div>}*/}
        </div>
    )
})