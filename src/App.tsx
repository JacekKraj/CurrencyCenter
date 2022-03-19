import React from 'react';
import './index.css';

import RoutesContainer from './routes/RoutesContainer';
import Nav from './components/utility/nav/Nav';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <RoutesContainer />
    </React.Fragment>
  );
};

export default App;
