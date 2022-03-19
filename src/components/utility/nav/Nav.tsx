import React from 'react';

import MobileNav from './mobileNav/MobileNav';
import LaptopNav from './laptopNav/LaptopNav';

const Nav: React.FC = () => {
  return (
    <React.Fragment>
      <MobileNav />
      <LaptopNav />
    </React.Fragment>
  );
};

export default Nav;
