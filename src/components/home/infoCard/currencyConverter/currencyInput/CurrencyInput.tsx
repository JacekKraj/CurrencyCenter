import React from 'react';

import classes from './currencyInput.module.scss';
import { Currencies } from './../../../../../utilities/enums/currencies';

export interface CurrencyInputValues {
  value?: number;
  currency: Currencies;
}

interface Props {
  label: string;
  values: CurrencyInputValues;
}

const CurrencyInput: React.FC<Props> = ({ label, values }) => {
  return (
    <div className={classes.currencyInput}>
      <p className={classes.label}>{label}</p>
      <div className={classes.inputsContainer}>
        <input type='number' className={classes.numberInput} value={values.value} />
        <select name='currencies' id='cars' className={classes.currencySelect} value={values.currency}>
          <option value={Currencies.PLN}>{Currencies.PLN}</option>
          <option value={Currencies.USD}>{Currencies.USD}</option>
          <option value={Currencies.EUR}>{Currencies.EUR}</option>
          <option value={Currencies.GBP}>{Currencies.GBP}</option>
          <option value={Currencies.CHF}>{Currencies.CHF}</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;
