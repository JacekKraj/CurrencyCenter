import React from 'react';

import classes from './home.module.scss';
import Nav from './../utility/nav/Nav';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <div className={classes.home}></div>
    </React.Fragment>
  );
};

export default Home;
