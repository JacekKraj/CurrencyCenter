import React from 'react';
import SwapHorizIcon from '@material-ui/icons//SwapHoriz';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { CurrencyComparison } from '../../../../utilities/ratesAPI/responseTypes';
import { Endpoints } from './../../../../utilities/ratesAPI/endpoints';
import axios from './../../../../utilities/ratesAPI/axios';
import classes from './currencyConverter.module.scss';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import CurrencyInput, { CurrencyInputProps, CurrencyInputValue } from './currencyInput/CurrencyInput';
import { Currencies } from './../../../../utilities/enums/currencies';

const { tabletHorizontal } = breakpoints;

const useStyles = makeStyles(() => ({
  swap: {
    width: 30,
    height: 30,
    backgroundColor: 'rgb(252,252,252)',
    position: 'absolute',
    right: -12,
    top: 30,
    color: '#07a549',
    cursor: 'pointer',
    transition: '300ms',
    [tabletHorizontal]: {
      position: 'relative',
      right: 0,
      top: 5,
    },
  },
  swapRotated: {
    transform: 'rotate(180deg)',
  },
}));

interface Status {
  wasChanged: boolean;
  last: string;
}

const HAVE = 'have';
const RECEIVE = 'receive';

const CurrencyConverter: React.FC = () => {
  const [haveInputValues, setHaveInputValues] = React.useState<CurrencyInputProps>({ currency: Currencies.PLN, value: '100' });
  const [receiveInputValues, setReceiveInputValues] = React.useState<CurrencyInputProps>({ currency: Currencies.USD, value: '0' });
  const [inputsSwapped, setInputsSwapped] = React.useState<boolean>(false);
  const [rate, setRate] = React.useState<string>('0.0');
  const [status, setStatus] = React.useState<Status>({ wasChanged: true, last: HAVE });

  const iconsStyle = useStyles();

  const getNewCurrencies = (currency: Currencies, type: string) => {
    const isHaveType = type === HAVE;
    const notChangedCurrency = isHaveType ? receiveInputValues.currency : haveInputValues.currency;

    let newHaveCurrency: Currencies, newReceiveCurrency: Currencies;

    if (currency === Currencies.PLN && notChangedCurrency === Currencies.PLN) {
      newHaveCurrency = isHaveType ? Currencies.PLN : receiveInputValues.currency;
      newReceiveCurrency = isHaveType ? haveInputValues.currency : Currencies.PLN;
    } else {
      newHaveCurrency = isHaveType ? currency : Currencies.PLN;
      newReceiveCurrency = isHaveType ? Currencies.PLN : currency;
    }

    return { newHaveCurrency, newReceiveCurrency };
  };

  const changeCurrency = (currency: Currencies, type: string) => {
    const { newHaveCurrency, newReceiveCurrency } = getNewCurrencies(currency, type);

    setReceiveInputValues((currState) => ({ ...currState, currency: newReceiveCurrency }));
    setHaveInputValues((currState) => ({ ...currState, currency: newHaveCurrency }));

    setStatus({ last: HAVE, wasChanged: true });
  };

  const valuesAreDifferent = (newValue: CurrencyInputValue, type: string) => {
    const oldValue = type === HAVE ? haveInputValues.value : receiveInputValues.value;

    return newValue !== oldValue;
  };

  const changeValue = (value: CurrencyInputValue, type: string) => {
    if (!valuesAreDifferent(value, type)) return;

    const setter = type === HAVE ? setHaveInputValues : setReceiveInputValues;
    setter((currState) => ({ ...currState, value }));

    setStatus({ last: type, wasChanged: true });
  };

  const swapInputs = () => {
    setHaveInputValues(receiveInputValues);
    setReceiveInputValues(haveInputValues);
    setInputsSwapped((currState) => !currState);
  };

  React.useEffect(() => {
    if (!status.wasChanged) return;

    const getPropsToCompare = () => {
      const isHaveStatus = status.last === HAVE;

      const value = isHaveStatus ? haveInputValues.value : receiveInputValues.value;
      const fromCurrency = isHaveStatus ? haveInputValues.currency : receiveInputValues.currency;
      const toCurrency = isHaveStatus ? receiveInputValues.currency : haveInputValues.currency;

      return { value, fromCurrency, toCurrency };
    };

    const valueIsValid = (value: CurrencyInputValue) => {
      return value && value !== '0' && value !== '0.' && value !== '0.0' && value !== '0.00';
    };

    const getNewComparisonData = async () => {
      const { value, fromCurrency, toCurrency } = getPropsToCompare();

      if (valueIsValid(value)) return await axios.get<CurrencyComparison>(`${Endpoints.COMAPRE_CURRENCIES}/${value}/${fromCurrency}/${toCurrency}/`);

      const onEmptyInputData = {
        data: {
          result: {
            exchangeAmount: '0',
            exchangeRate: rate,
          },
        },
      };

      return onEmptyInputData;
    };

    const updateComparison = async () => {
      const { data } = await getNewComparisonData();

      setRate(data.result.exchangeRate);

      const setter = status.last === HAVE ? setReceiveInputValues : setHaveInputValues;
      setter((currState: CurrencyInputProps) => ({ ...currState, value: data.result.exchangeAmount }));
    };

    updateComparison();

    setStatus((currState) => ({ ...currState, wasChanged: false }));
  }, [status.wasChanged]);

  return (
    <div className={classes.currencyConverter}>
      <div className={classes.inputsWithConnector}>
        <CurrencyInput label={HAVE} values={{ ...haveInputValues, changeCurrency, changeValue }} />
        <div className={classes.inputsConnector}>
          <div className={classes.connectorLine}></div>
          <SwapHorizIcon
            className={classnames(iconsStyle.swap, inputsSwapped && iconsStyle.swapRotated)}
            onClick={swapInputs}
            data-test='swap-button'
          />
        </div>
        <CurrencyInput label={RECEIVE} values={{ ...receiveInputValues, changeCurrency, changeValue }} />
      </div>
      <p className={classes.rate}>
        Current rate:{' '}
        <span className={classes.rateValue} data-test='currency-rate'>
          {rate}
        </span>
      </p>
    </div>
  );
};

export default CurrencyConverter;
