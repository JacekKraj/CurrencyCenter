import React from 'react';

import classes from './infoCard.module.scss';
import Info from './info/Info';
import CurrencyConverter from './currencyConverter/CurrencyConverter';

const InfoCard: React.FC = () => {
  return (
    <div className={classes.infoCard}>
      <div className={classes.infoCardWrapper}>
        <Info />
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default InfoCard;
