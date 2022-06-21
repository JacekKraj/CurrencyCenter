import React from 'react';

import classes from './chartError.module.scss';
import { HistoricalRatesContext } from '../../../../context/providers/HistoricalRatesContextProvider';

const ChartError: React.FC = () => {
  const { errorMessage } = React.useContext(HistoricalRatesContext);
  return <div className={classes.error}>{errorMessage}</div>;
};

export default ChartError;
