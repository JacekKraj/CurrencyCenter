import React from 'react';

import classes from './header.module.scss';
import CurrencyPicker from '../../utility/currencyPicker/CurrencyPicker';
import { Currencies } from '../../../utilities/enums/currencies';
import PageHeader from '../../utility/pageHeader/PageHeader';

const Header: React.FC = () => {
  return (
    <div className={classes.chartHeader}>
      <PageHeader text={`USD historical rates`}></PageHeader>
      <CurrencyPicker className={classes.pickerAdditional} value={Currencies.USD} changeValue={() => {}} />
    </div>
  );
};

export default Header;
