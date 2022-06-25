import React from 'react';

import classes from './customTooltip.module.scss';
import { HistoricalRatesContext } from '../../../../context/providers/HistoricalRatesContextProvider';
import Value from './value/Value';

// Required to have props of type any and cant be React.FC due to recharts rules

const CustomTooltip = ({ active, payload, label }: any) => {
  const { isActiveStatus } = React.useContext(HistoricalRatesContext);
  const { buy, sell, average } = isActiveStatus;

  const isShown = active && payload?.length;

  return isShown ? (
    <div className={classes.customTooltip}>
      <h6 className={classes.label}>{label}</h6>
      <Value isShown={buy} description='Best buy Rate' value={payload[0].payload.buyValue} />
      <Value isShown={sell} description='Best sell Rate' value={payload[0].payload.sellValue} />
      <Value isShown={average} description='Best average Rate' value={payload[0].payload.averageValue} />
    </div>
  ) : null;
};

export default CustomTooltip;
