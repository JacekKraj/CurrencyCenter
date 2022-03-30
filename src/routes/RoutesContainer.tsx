import React from 'react';
import { Routes, Route } from 'react-router';

import Home from './../components/home/Home';
import SignIn from './../components/auth/signIn/SignIn';
import SignUp from './../components/auth/signUp/SignUp';

const RoutesContainer: React.FC = () => {
  const routes = (
    <Routes>
      <Route path='/SignIn' element={<SignIn />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );

  return routes;
};

export default RoutesContainer;
