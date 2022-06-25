import React from 'react';

import classes from './infoCard.module.scss';
import Info from './info/Info';
import CurrencyConverter from './currencyConverter/CurrencyConverter';
import SectionWrapper from '../../utility/wrappers/sectionWrapper/SectionWrapper';

const InfoCard: React.FC = () => {
  return (
    <SectionWrapper backgorundClassName={classes.background} wrapperClassName={classes.wrapperAdditional}>
      <div className={classes.infoCardWrapper}>
        <Info />
        <CurrencyConverter />
      </div>
    </SectionWrapper>
  );
};

export default InfoCard;
