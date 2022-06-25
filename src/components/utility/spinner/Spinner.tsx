import React from 'react';

import classes from './spinner.module.scss';

const Spinner: React.FC = () => {
  return <div className={classes.spinner} data-test='spinner'></div>;
};

export default Spinner;
