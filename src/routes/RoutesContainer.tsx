import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Home from './../components/home/Home';
import SignIn from './../components/auth/signIn/SignIn';
import SignUp from './../components/auth/signUp/SignUp';
import { AuthContext } from '../context/providers/AuthContextProvider';

const RoutesContainer: React.FC = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  const unauthenticatedRoutes = (
    <React.Fragment>
      <Route path='/' element={<Home />} />
      <Route path='SignIn' element={<SignIn />} />
      <Route path='SignUp' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </React.Fragment>
  );

  const authenticatedRoutes = (
    <React.Fragment>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </React.Fragment>
  );

  const routes = <Routes>{isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}</Routes>;

  return routes;
};

export default RoutesContainer;
