import React from 'react';

import Header from './header/Header';
import Nav from '../utility/nav/Nav';
import Footer from '../utility/footer/Footer';
import SectionWrapper from '../utility/wrappers/sectionWrapper/SectionWrapper';
import Controls from './controls/Controls';
import HistoricalRatesContextProvider from '../../context/providers/HistoricalRatesContextProvider';
import Chart from './chart/Chart';

const HistoricalRates: React.FC = () => {
  return (
    <HistoricalRatesContextProvider>
      <Nav />
      <SectionWrapper>
        <Header />
        <Controls />
        <Chart />
      </SectionWrapper>
      <Footer />
    </HistoricalRatesContextProvider>
  );
};

export default HistoricalRates;
