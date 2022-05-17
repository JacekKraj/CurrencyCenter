import React from 'react';

import classes from './banksComparison.module.scss';
import Nav from '../utility/nav/Nav';
import Footer from '../utility/footer/Footer';
import ComparisonHeader from './comparisonHeader/ComparisonHeader';
import { Currencies } from './../../utilities/enums/currencies';
import ComparisonTable from './comparisonTable/ComparisonTable';

const BanksComparison: React.FC = () => {
  const [currency, setCurrency] = React.useState<Currencies>(Currencies.USD);
  return (
    <React.Fragment>
      <Nav />
      <div className={classes.banksComparisonContentWrapper}>
        <ComparisonHeader currency={currency} setCurrency={setCurrency} />
        <ComparisonTable currency={currency} />
        <p className={classes.ratesValidationInfo}>Exchange rates valid as of 5-12-2022 </p>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BanksComparison;
