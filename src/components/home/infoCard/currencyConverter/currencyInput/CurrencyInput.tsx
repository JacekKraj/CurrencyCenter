import React from 'react';
import ValueInput from 'react-currency-input-field';

import classes from './currencyInput.module.scss';
import { Currencies } from '../../../../../utilities/globalEnums/currencies';

export type CurrencyInputValue = string | undefined;

export interface CurrencyInputProps {
  value: CurrencyInputValue;
  currency: Currencies;
}

interface Props {
  label: string;
  values: CurrencyInputProps & {
    changeCurrency: (currency: Currencies, type: string) => void;
    changeValue: (value: CurrencyInputValue, type: string) => void;
  };
}

const WRONG_SIGNS = ['-'];
const MAX_VALUE_LENGTH = 10;

const CurrencyInput: React.FC<Props> = (props) => {
  const { label, values } = props;
  const { value, currency, changeValue, changeCurrency } = values;

  const valueInputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((values.value && values.value.length > MAX_VALUE_LENGTH && e.key !== 'Backspace') || WRONG_SIGNS.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    WRONG_SIGNS.includes(e.clipboardData.getData('Text')) && e.preventDefault();
  };

  const onChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(event.target.value as Currencies, label);
  };

  const setCursorPosition = (value: CurrencyInputValue) => {
    if (value && valueInputRef.current) {
      valueInputRef.current.selectionEnd = value.length + 1;
    }
  };

  const isValueToAddZero = (value: CurrencyInputValue) => {
    return value && value[0] === '.' && value.length > 1;
  };

  const isValueToChange = (value: CurrencyInputValue) => {
    if (value && values.value && value.length > values.value.length && value.length > MAX_VALUE_LENGTH) return false;

    return true;
  };

  const modifyValue = (value: CurrencyInputValue) => {
    if (!isValueToChange(value)) return values.value;

    if (isValueToAddZero(value)) {
      setCursorPosition(value);
      return `0${value}`;
    }

    return value;
  };

  const onChangeValue = (value: CurrencyInputValue) => {
    const modifiedValue = modifyValue(value);

    changeValue(modifiedValue, label);
  };

  return (
    <div className={classes.currencyInput}>
      <p className={classes.label}>{label}</p>
      <div className={classes.inputsContainer}>
        <ValueInput
          className={classes.numberInput}
          data-test={`${label}-value-input`}
          defaultValue={value}
          decimalsLimit={2}
          decimalSeparator='.'
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={value}
          allowNegativeValue={false}
          onValueChange={onChangeValue}
          ref={valueInputRef}
        />
        <select
          name='currencies'
          className={classes.currencySelect}
          value={currency}
          onChange={onChangeCurrency}
          data-test={`${label}-currency-input`}
        >
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
