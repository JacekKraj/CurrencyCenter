import React from 'react';
import classnames from 'classnames';

import classes from './sideBar.module.scss';
import NoTextLogo from '../../../noTextLogo/NoTextLogo';
import NavItems from '../../navItems/NavItems';

interface Props {
  isShown: boolean;
}

const SideBar: React.FC<Props> = ({ isShown }) => {
  return (
    <div className={classnames(classes.sideBar, isShown && classes.shown)} data-test='mobile-nav'>
      <div className={classes.logoContainer}>
        <NoTextLogo className={classes.logo} />
      </div>
      <NavItems />
    </div>
  );
};

export default SideBar;
