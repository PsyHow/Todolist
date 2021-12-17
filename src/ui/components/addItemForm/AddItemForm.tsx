import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { AddBox } from '@material-ui/icons';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItem = (): void => {
    if (title.trim() !== '') {
      props.addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (error !== null) {
      setError(null);
    }
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton
        style={{ marginTop: '6px' }}
        color="primary"
        onClick={addItem}
        disabled={props.disabled}
      >
        <AddBox />
      </IconButton>
    </div>
  );
});
