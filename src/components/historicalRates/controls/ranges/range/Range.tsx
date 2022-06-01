import React from 'react';

import classes from './range.module.scss';

interface Props {
  value: string;
}

const Range: React.FC<Props> = ({ value }) => {
  return <div className={classes.range}>{value}</div>;
};

export default Range;
