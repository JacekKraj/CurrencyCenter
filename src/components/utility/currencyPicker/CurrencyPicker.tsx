import React from 'react';
import classnames from 'classnames';

import classes from './currencyPicker.module.scss';
import { Currencies } from './../../../utilities/enums/currencies';

interface Props {
  value: Currencies;
  changeValue: (value: Currencies) => void;
  blockedCurrencies?: Currencies[];
  className?: string;
  dataTest?: string;
}

const CurrencyPicker: React.FC<Props> = (props) => {
  const { value, changeValue, blockedCurrencies, className, dataTest } = props;

  const renderOptions = () => {
    const filteredCurrencies = Object.values(Currencies).filter((currency) => !blockedCurrencies?.includes(currency));

    return filteredCurrencies.map((currency) => {
      return (
        <option value={Currencies[currency]} key={currency}>
          {Currencies[currency]}
        </option>
      );
    });
  };

  return (
    <select
      name='currencies'
      value={value}
      data-test={dataTest}
      onChange={(e) => {
        changeValue(e.target.value as Currencies);
      }}
      className={classnames(classes.currencyPicker, className)}
    >
      {renderOptions()}
    </select>
  );
};

export default CurrencyPicker;
