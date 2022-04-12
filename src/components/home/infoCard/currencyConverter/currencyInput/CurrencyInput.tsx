import React from 'react';

import classes from './currencyInput.module.scss';
import { Currencies } from './../../../../../utilities/enums/currencies';

export interface CurrencyInputValues {
  value: number | '';
  currency: Currencies;
}

interface Props {
  label: string;
  values: CurrencyInputValues & {
    changeCurrency: (currency: Currencies, type: string) => void;
    changeValue: (value: number | '', type: string) => void;
  };
}

const CurrencyInput: React.FC<Props> = (props) => {
  const { label, values } = props;
  const { value, currency, changeValue, changeCurrency } = values;

  const WRONG_SIGNS = ['e', 'E', '+', '-'];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    WRONG_SIGNS.includes(e.key) && e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    WRONG_SIGNS.includes(e.clipboardData.getData('Text')) && e.preventDefault();
  };

  const onChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(event.target.value as Currencies, label);
  };

  const inputIsValid = (value: string) => {
    const valueNumbers = value.split('');

    if (!valueNumbers.includes('.')) return true;

    // check if has more than two numbers after "."
    if (valueNumbers.length - valueNumbers.indexOf('.') > 3) return false;

    return true;
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputIsValid(event.target.value)) {
      const valueToSet = event.target.value === '' ? '' : +event.target.value;
      changeValue(valueToSet, label);
    }
  };

  return (
    <div className={classes.currencyInput}>
      <p className={classes.label}>{label}</p>
      <div className={classes.inputsContainer}>
        <input
          className={classes.numberInput}
          step={1}
          min={0}
          type='number'
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={value}
          onChange={onChangeValue}
        />
        <select name='currencies' className={classes.currencySelect} value={currency} onChange={onChangeCurrency}>
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
