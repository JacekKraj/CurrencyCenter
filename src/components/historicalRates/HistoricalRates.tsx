import React from 'react';

import Header from './header/Header';
import Nav from '../utility/nav/Nav';
import Footer from '../utility/footer/Footer';
import SectionWrapper from '../utility/wrappers/sectionWrapper/SectionWrapper';
import Controls from './controls/Controls';

const HistoricalRates: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <SectionWrapper>
        <Header />
        <Controls />
      </SectionWrapper>
      <Footer />
    </React.Fragment>
  );
};

export default HistoricalRates;
