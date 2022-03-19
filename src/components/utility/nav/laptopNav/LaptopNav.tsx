import React from 'react';

import classes from './laptopNav.module.scss';
import NavHeader from '../navHeader/NavHeader';
import NavItems from './../navItems/NavItems';

const LaptopNav: React.FC = () => {
  return (
    <div className={classes.laptopNav}>
      <NavHeader>
        <NavItems />
      </NavHeader>
    </div>
  );
};

export default LaptopNav;
