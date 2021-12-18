import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';

import { AddBox } from '@material-ui/icons';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { Nullable } from 'types';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormPropsType> = memo(props => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<Nullable<string>>(null);

  const addItem = (): void => {
    if (title.trim() !== '') {
      props.addItem(title);
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const onChangeHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
  };
  const onKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>): void => {
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
        onChange={onChangeHandle}
        onKeyPress={onKeyPressHandle}
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
