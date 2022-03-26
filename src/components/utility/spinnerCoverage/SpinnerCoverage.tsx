import React from 'react';

import classes from './spinnerCoverage.module.scss';
import Spinner from '../spinner/Spinner';

const SpinnerCoverage: React.FC = () => {
  return (
    <div className={classes.spinnerCoverage}>
      <Spinner />
    </div>
  );
};

export default SpinnerCoverage;
