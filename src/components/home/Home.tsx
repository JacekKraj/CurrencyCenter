import React from 'react';

import classes from './home.module.scss';
import Nav from './../utility/nav/Nav';
import InfoCard from './infoCard/InfoCard';
import Rates from './rates/Rates';
import Features from './features/Features';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <InfoCard />
      <Rates />
      <Features />
    </React.Fragment>
  );
};

export default Home;
