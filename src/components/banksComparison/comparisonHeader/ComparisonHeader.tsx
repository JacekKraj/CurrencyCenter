import React, { Dispatch, SetStateAction } from 'react';

import classes from './comparisonHeader.module.scss';
import CurrencyPicker from '../../utility/currencyPicker/CurrencyPicker';
import { Currencies } from '../../../utilities/globalEnums/currencies';
import PageHeader from './../../utility/pageHeader/PageHeader';

interface Props {
  currency: Currencies;
  setCurrency: Dispatch<SetStateAction<Currencies>>;
}

const ComparisonHeader: React.FC<Props> = ({ currency, setCurrency }) => {
  return (
    <div className={classes.comparisonHeader}>
      <div className={classes.header}>
        <PageHeader dataTest='comparison-header-currency-info' text={`${currency} exchange rates in banks`} />
        <CurrencyPicker
          value={currency}
          changeValue={setCurrency}
          blockedCurrencies={[Currencies.PLN]}
          className={classes.pickerAdditional}
          dataTest='comparison-currency-picker'
        />
      </div>

      <p className={classes.headerInfo}>
        Did you know that depending on which bank you exchange your money with, the difference can be up to several %?
      </p>
    </div>
  );
};

export default ComparisonHeader;
