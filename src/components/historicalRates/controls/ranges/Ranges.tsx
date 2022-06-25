import React from 'react';

import classes from './ranges.module.scss';
import Range from './range/Range';
import { Ranges as RangesEnum } from '../../../../context/reducers/historicalRatesReducer';

const Ranges: React.FC = () => {
  return (
    <div className={classes.ranges}>
      <Range value={RangesEnum.ONE_DAY} />
      <Range value={RangesEnum.ONE_WEEK} />
      <Range value={RangesEnum.ONE_MONTH} />
      <Range value={RangesEnum.THREE_MONTHS} />
      <Range value={RangesEnum.SIX_MONTHS} />
      <Range value={RangesEnum.ONE_YEAR} />
    </div>
  );
};

export default Ranges;
