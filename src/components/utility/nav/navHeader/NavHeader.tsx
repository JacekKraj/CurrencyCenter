import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

import classes from './navHeader.module.scss';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import Logo from './../../../../assets/images/Logo.png';
import TextLogo from './../../textLogo/TextLogo';
import NoTextLogo from '../../noTextLogo/NoTextLogo';
import Button from './../../button/Button';

const { laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  nav: {
    color: '#0CCF5D',
    fontSize: '34px',
    marginRight: '0.4em',
    cursor: 'pointer',
    [laptopSm]: {
      display: 'none ',
    },
  },
}));

interface Props {
  chlidren?: React.ReactNode;
  showSideBar?: () => void;
}

const NavHeader: React.FC<Props> = ({ children, showSideBar }) => {
  const iconsStyle = useStyles();

  return (
    <div className={classes.mobileNav}>
      <div className={classes.navLeftSide}>
        <MenuIcon className={iconsStyle.nav} onClick={showSideBar} data-test='show-mobile-nav-icon' />
        <NoTextLogo className={classes.noTextLogo} />
        <TextLogo className={classes.textLogo} />
        {children}
      </div>
      <div className={classes.navButtons}>
        <NavLink to='/SignIn'>
          <button className={classes.signInButton}>Sign In</button>
        </NavLink>
        <NavLink to='/SignUp'>
          <Button className={classes.buttonAdditional}>Open account</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavHeader;
