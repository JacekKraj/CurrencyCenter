import React from 'react';

import classes from './sectionWrapper.module.scss';
import classnames from 'classnames';

interface Props {
  children: React.ReactNode;
  wrapperClassName?: string;
  backgorundClassName?: string;
}

const SectionWrapper: React.FC<Props> = ({ children, wrapperClassName, backgorundClassName }) => {
  return (
    <div className={backgorundClassName}>
      <div className={classnames(classes.sectionWrapper, wrapperClassName)}>{children}</div>
    </div>
  );
};

export default SectionWrapper;
