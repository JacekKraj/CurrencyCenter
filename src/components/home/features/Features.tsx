import React from 'react';

import classes from './features.module.scss';
import Feature from './feature/Feature';
import Bank from './../../../assets/images/Bank.png';
import Chart from './../../../assets/images/Chart.png';
import Diary from './../../../assets/images/Diary.png';
import SectionWrapper from '../../utility/wrappers/sectionWrapper/SectionWrapper';

const Features: React.FC = () => {
  return (
    <SectionWrapper backgorundClassName={classes.background}>
      <div className={classes.featuresContainer}>
        <Feature icon={Diary} description='Store your trasctions in diary' />
        <Feature icon={Chart} description='Check historical rates' />
        <Feature icon={Bank} description='Compare rates beetwen banks' />
      </div>
    </SectionWrapper>
  );
};

export default Features;
