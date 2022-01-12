import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  // eslint-disable-next-line react/require-default-props
  primary?: boolean;
  /**
   * What background color to use
   */
  // eslint-disable-next-line react/require-default-props
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  // eslint-disable-next-line react/require-default-props
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {label}
    </button>
  );
};
