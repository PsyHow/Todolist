import React, { ChangeEvent, useState } from 'react';

import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
  };

  return editMode ? (
    <TextField
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      disabled={props.disabled}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
