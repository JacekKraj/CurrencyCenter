import React from 'react';

import classes from './info.module.scss';
import CurrencyExchange from './../../../../assets/images/CurrencyExchange.png';

const Info: React.FC = () => {
  return (
    <div className={classes.info}>
      <div className={classes.texts}>
        <h1 className={classes.mainText}>Currency Center</h1>
        <p className={classes.secondaryText}>All you need about currencies, gathered in one place</p>
      </div>
      <div className={classes.imageContainer}>
        <img src={CurrencyExchange} alt='' className={classes.image} />
      </div>
    </div>
  );
};

export default Info;
