import React from 'react';

import classes from './features.module.scss';
import Feature from './feature/Feature';
import Bank from './../../../assets/images/Bank.png';
import Chart from './../../../assets/images/Chart.png';
import Diary from './../../../assets/images/Diary.png';

const Features: React.FC = () => {
  return (
    <div className={classes.featuresComponent}>
      <div className={classes.featuresContainer}>
        <Feature icon={Diary} description='Store your trasctions in diary' />
        <Feature icon={Chart} description='Check historical rates' />
        <Feature icon={Bank} description='Compare rates beetwen banks' />
      </div>
    </div>
  );
};

export default Features;
