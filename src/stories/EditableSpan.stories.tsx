import React from 'react';

import { action } from '@storybook/addon-actions';

import { EditableSpan } from 'ui';

export default {
  title: 'EditableSpan Stories',
  component: EditableSpan,
};

export const EditableSpanFormBaseExample = (): any => (
  <EditableSpan disabled={false} value="StartValue" onChange={action('value changed')} />
);
