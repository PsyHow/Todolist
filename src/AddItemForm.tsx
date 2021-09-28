import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

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
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    )
}

export default AddItemForm;