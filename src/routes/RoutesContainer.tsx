import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Home from './../components/home/Home';
import SignIn from './../components/auth/signIn/SignIn';
import SignUp from './../components/auth/signUp/SignUp';
import BanksComparison from '../components/banksComparison/BanksComparison';
import { AuthContext } from '../context/providers/AuthContextProvider';

const RoutesContainer: React.FC = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  const commonRoutes = (
    <React.Fragment>
      <Route path='/' element={<Home />} />
      <Route path='Banks' element={<BanksComparison />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </React.Fragment>
  );

  const unauthenticatedRoutes = (
    <React.Fragment>
      <Route path='SignIn' element={<SignIn />} />
      <Route path='SignUp' element={<SignUp />} />
      {commonRoutes}
    </React.Fragment>
  );

  const authenticatedRoutes = <React.Fragment>{commonRoutes}</React.Fragment>;

  const routes = <Routes>{isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}</Routes>;

  return routes;
};

export default RoutesContainer;
