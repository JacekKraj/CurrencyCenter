import React from 'react';

import classes from './rates.module.scss';
import Rate from './rate/Rate';
import { Currencies } from '../../../utilities/enums/currencies';

const Rates: React.FC = () => {
  return (
    <div className={classes.ratesComponentWrapper}>
      <div className={classes.ratesComponent}>
        <h3 className={classes.ratesHeader}>Best current rates</h3>
        <div className={classes.ratesContainer}>
          <Rate currency={Currencies.USD} rates={{ buy: 4.4422, sell: 4.4242 }} />
          <Rate currency={Currencies.EUR} rates={{ buy: 4.4422, sell: 4.4242 }} />
          <Rate currency={Currencies.CHF} rates={{ buy: 4.4422, sell: 4.4242 }} />
          <Rate currency={Currencies.GBP} rates={{ buy: 4.4422, sell: 4.4242 }} />
        </div>
      </div>
    </div>
  );
};

export default Rates;
