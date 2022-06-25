import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './rate.module.scss';
import { Currencies } from '../../../../utilities/globalEnums/currencies';

export interface Props {
  currency: Currencies;
  values: {
    sell: number;
    buy: number;
  };
}

const Rate: React.FC<Props> = ({ currency, values }) => {
  return (
    <NavLink to={`HistoricalRates?currency=${currency}`} className={classes.rateComponent}>
      <p className={classes.currency}>{currency}</p>
      <div className={classes.rateValues}>
        <div>
          <p className={classes.rateType}>Buy</p>
          <p className={classes.rateValue}>{values.buy} PLN</p>
        </div>
        <div>
          <p className={classes.rateType}>Sell</p>
          <p className={classes.rateValue}>{values.sell} PLN</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Rate;
