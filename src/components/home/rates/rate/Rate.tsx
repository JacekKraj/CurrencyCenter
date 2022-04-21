import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './rate.module.scss';
import { Currencies } from '../../../../utilities/enums/currencies';

interface Props {
  currency: Currencies;
  rates: {
    sell: number;
    buy: number;
  };
}

const Rate: React.FC<Props> = ({ currency, rates }) => {
  return (
    <NavLink to='/' className={classes.rateComponent}>
      <p className={classes.currency}>{currency}</p>
      <div className={classes.rateValues}>
        <div>
          <p className={classes.rateType}>Buy</p>
          <p className={classes.rateValue}>{rates.buy} PLN</p>
        </div>
        <div>
          <p className={classes.rateType}>Sell</p>
          <p className={classes.rateValue}>{rates.sell} PLN</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Rate;
