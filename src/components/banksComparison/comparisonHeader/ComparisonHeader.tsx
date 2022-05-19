import React, { Dispatch, SetStateAction } from 'react';

import classes from './comparisonHeader.module.scss';
import CurrencyPicker from '../../utility/currencyPicker/CurrencyPicker';
import { Currencies } from './../../../utilities/enums/currencies';

interface Props {
  currency: Currencies;
  setCurrency: Dispatch<SetStateAction<Currencies>>;
}

const ComparisonHeader: React.FC<Props> = ({ currency, setCurrency }) => {
  return (
    <div className={classes.comparisonHeader}>
      <div className={classes.header}>
        <h1 className={classes.headerTitle}>{currency} exchange rates in banks</h1>
        <CurrencyPicker value={currency} changeValue={setCurrency} blockedCurrencies={[Currencies.PLN]} className={classes.picker} />
      </div>

      <p className={classes.headerInfo}>
        Did you know that depending on which bank you exchange your money with, the difference can be up to several %?
      </p>
    </div>
  );
};

export default ComparisonHeader;
