import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../../context/providers/AuthContextProvider';
import classes from './navHeader.module.scss';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
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
  const { isAuthenticated, logout } = React.useContext(AuthContext);

  const iconsStyle = useStyles();

  const unauthenticatedButtons = (
    <React.Fragment>
      <NavLink to='/SignIn'>
        <button className={classes.signInButton}>Sign In</button>
      </NavLink>
      <NavLink to='/SignUp'>
        <Button className={classes.buttonAdditional}>Open account</Button>
      </NavLink>
    </React.Fragment>
  );

  const authenticatedButton = (
    <Button className={classes.buttonAdditional} onClick={logout}>
      Sign out
    </Button>
  );

  return (
    <div className={classes.mobileNav}>
      <div className={classes.navLeftSide}>
        <MenuIcon className={iconsStyle.nav} onClick={showSideBar} data-test='show-mobile-nav-icon' />
        <NoTextLogo className={classes.noTextLogo} />
        <TextLogo className={classes.textLogo} />
        {children}
      </div>
      <div className={classes.navButtons}>{isAuthenticated ? authenticatedButton : unauthenticatedButtons}</div>
    </div>
  );
};

export default NavHeader;
