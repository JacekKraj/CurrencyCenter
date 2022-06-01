import React from 'react';

import classes from './ranges.module.scss';
import Range from './range/Range';

const Ranges: React.FC = () => {
  return (
    <div className={classes.ranges}>
      <Range value='1 day' />
      <Range value='1 week' />
      <Range value='1 month' />
      <Range value='3 months' />
      <Range value='6 months' />
      <Range value='1 year' />
    </div>
  );
};

export default Ranges;
