import React from 'react';

import classes from './mobileNav.module.scss';
import NavHeader from '../navHeader/NavHeader';
import SideBar from './sideBar/SideBar';
import Backdrop from '../../backdrop/Backdrop';

const MobileNav: React.FC = () => {
  const [sideBarIsShown, setSideBarIsShown] = React.useState<boolean>(false);

  const toggleShowSideBar = () => {
    setSideBarIsShown((currValue) => !currValue);
  };

  return (
    <div className={classes.mobileNav}>
      <NavHeader showSideBar={toggleShowSideBar} />
      <React.Fragment>
        <SideBar isShown={sideBarIsShown} />
        <Backdrop onClick={toggleShowSideBar} isShown={sideBarIsShown} />
      </React.Fragment>
    </div>
  );
};

export default MobileNav;
