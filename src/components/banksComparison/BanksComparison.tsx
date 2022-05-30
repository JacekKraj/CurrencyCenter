import React from 'react';

import classes from './banksComparison.module.scss';
import Nav from '../utility/nav/Nav';
import Footer from '../utility/footer/Footer';
import ComparisonHeader from './comparisonHeader/ComparisonHeader';
import { Currencies } from './../../utilities/enums/currencies';
import ComparisonTable from './comparisonTable/ComparisonTable';
import { getBuildedDate } from '../../utilities/helperFunctions/getBuildedDate';

const BanksComparison: React.FC = () => {
  const [currency, setCurrency] = React.useState<Currencies>(Currencies.USD);
  const [validFrom, setValidFrom] = React.useState<Date>(new Date());

  return (
    <React.Fragment>
      <Nav />
      <div className={classes.banksComparisonContentWrapper}>
        <ComparisonHeader currency={currency} setCurrency={setCurrency} />
        <ComparisonTable currency={currency} setValidFrom={setValidFrom} />
        <p className={classes.ratesValidationInfo}>{`Exchange rates valid as of ${getBuildedDate(validFrom)}`}</p>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BanksComparison;
