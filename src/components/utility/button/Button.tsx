import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

interface Props {
  onClick?: () => void;
  children: string;
  className?: string;
  isDisabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const Button: React.FC<Props> = (props) => {
  const { children, className, isDisabled, type, onClick } = props;
  return (
    <button disabled={isDisabled} className={classnames(classes.button, className)} type={type || 'button'} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
