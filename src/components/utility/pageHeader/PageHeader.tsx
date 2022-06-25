import React from 'react';

import classes from './pageHeader.module.scss';
import classnames from 'classnames';

interface Props {
  text: string;
  className?: string;
  dataTest?: string;
}

const PageHeader: React.FC<Props> = ({ text, className, dataTest }) => {
  return (
    <h1 className={classnames(classes.pageHeader, className)} data-test={dataTest}>
      {text}
    </h1>
  );
};

export default PageHeader;
