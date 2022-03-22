import React, { Suspense } from 'react';
import './index.css';

import RoutesContainer from './routes/RoutesContainer';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <RoutesContainer />
    </Suspense>
  );
};

export default App;
