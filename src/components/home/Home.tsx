import React from 'react';

import Nav from './../utility/nav/Nav';
import InfoCard from './infoCard/InfoCard';
import Rates from './rates/Rates';
import Features from './features/Features';
import Footer from '../utility/footer/Footer';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <InfoCard />
      <Rates />
      <Features />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
