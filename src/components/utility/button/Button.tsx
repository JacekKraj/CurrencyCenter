import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

interface Props {
  onClick?: () => void;
  children: string;
  className?: string;
  isDisabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  dataTest?: string;
}

const Button: React.FC<Props> = (props) => {
  const { children, className, isDisabled, type, onClick, dataTest } = props;
  return (
    <button disabled={isDisabled} className={classnames(classes.button, className)} type={type || 'button'} onClick={onClick} data-test={dataTest}>
      {children}
    </button>
  );
};

export default Button;
