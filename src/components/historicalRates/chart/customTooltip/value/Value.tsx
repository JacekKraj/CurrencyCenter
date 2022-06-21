import React from 'react';

import classes from './value.module.scss';

interface Props {
  isShown: boolean;
  description: string;
  value: number;
}

const Value: React.FC<Props> = ({ isShown, description, value }) => {
  return (
    <p className={classes.valueContainer}>
      {isShown && (
        <React.Fragment>
          <span className={classes.valueDesc}>{description}: </span>
          <span>{value}</span>
        </React.Fragment>
      )}
    </p>
  );
};

export default Value;
