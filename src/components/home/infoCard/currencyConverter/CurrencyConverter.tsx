import React from 'react';
import SwapHorizIcon from '@material-ui/icons//SwapHoriz';
import { makeStyles } from '@material-ui/core/styles';

import classes from './currencyConverter.module.scss';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import CurrencyInput, { CurrencyInputValues } from './currencyInput/CurrencyInput';
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
    [tabletHorizontal]: {
      position: 'relative',
      right: 0,
      top: 5,
    },
  },
}));

const CurrencyConverter: React.FC = () => {
  const [fromInputValues, setFromInputValues] = React.useState<CurrencyInputValues>({ currency: Currencies.PLN });
  const [toInputValues, settoInputValues] = React.useState<CurrencyInputValues>({ currency: Currencies.USD });

  const iconsStyle = useStyles();

  return (
    <div className={classes.currencyConverter}>
      <div className={classes.inputsWithConnector}>
        <CurrencyInput label='have' values={fromInputValues} />
        <div className={classes.inputsConnector}>
          <div className={classes.connectorLine}></div>
          <SwapHorizIcon className={iconsStyle.swap} />
        </div>
        <CurrencyInput label='receive' values={toInputValues} />
      </div>
      <p className={classes.rate}>
        Current rate: <span className={classes.rateValue}>3,5678</span>
      </p>
    </div>
  );
};

export default CurrencyConverter;
