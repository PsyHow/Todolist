import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormTypes = {
    addItem:(title:string)=>void
}

function AddItemForm(props:AddItemFormTypes) {

    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
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
                error={error}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addItem}>
                <AddBox color={"primary"}/>
            </IconButton>
            {/*{error && <div style={{color: "red"}}>Title is required!</div>}*/}
        </div>
    )
}

export default AddItemForm;