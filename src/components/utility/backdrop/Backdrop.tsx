import React from 'react';
import classnames from 'classnames';

import classes from './backdrop.module.scss';

interface Props {
  onClick: () => void;
  isShown: boolean;
}

const Backdrop: React.FC<Props> = ({ onClick, isShown }) => {
  return <div onClick={onClick} className={classnames(classes.backdrop, isShown && classes.shown)}></div>;
};

export default Backdrop;
