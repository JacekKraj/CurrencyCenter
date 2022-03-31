import React from 'react';

import classes from './routeLoader.module.scss';
import Spinner from './../spinner/Spinner';

const RouteLoader: React.FC = () => {
  return (
    <div className={classes.routeLoader}>
      <Spinner />
    </div>
  );
};

export default RouteLoader;
