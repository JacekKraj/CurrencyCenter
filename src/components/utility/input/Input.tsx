import React from 'react';
import classnames from 'classnames';

import classes from './input.module.scss';

interface Props {
  type: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<Props> = (props) => {
  const { className } = props;

  return <input {...props} required autoComplete='off' className={classnames(className, classes.input)} />;
};

export default Input;
