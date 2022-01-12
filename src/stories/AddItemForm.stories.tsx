import React from 'react';

import { action } from '@storybook/addon-actions';

import { AddItemForm } from 'ui';

export default {
  title: 'AddItemForm Stories',
  component: AddItemForm,
};

export const AddItemFormBaseExample = (): any => (
  <AddItemForm addItem={action('Button inside form clicked')} />
);
