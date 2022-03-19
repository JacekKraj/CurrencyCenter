import React from 'react';
import { Routes, Route } from 'react-router';

import Home from './../components/home/Home';

const RoutesContainer: React.FC = () => {
  const routes = (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  );

  return routes;
};

export default RoutesContainer;
