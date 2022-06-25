import React from 'react';
import classnames from 'classnames';

import classes from './range.module.scss';
import { Ranges } from './../../../../../context/reducers/historicalRatesReducer';
import { HistoricalRatesContext } from './../../../../../context/providers/HistoricalRatesContextProvider';

interface Props {
  value: Ranges;
}

const Range: React.FC<Props> = ({ value }) => {
  const { setCurrentRange, currentRange } = React.useContext(HistoricalRatesContext);

  const onClickHandler = () => {
    setCurrentRange(value);
  };

  const isCurrentRange = currentRange === value;

  return (
    <div className={classnames(classes.range, isCurrentRange && classes.rangeActive)} onClick={onClickHandler} data-test='range'>
      {value}
    </div>
  );
};

export default Range;
