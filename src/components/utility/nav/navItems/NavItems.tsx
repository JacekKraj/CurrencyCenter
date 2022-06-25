import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';

import { AuthContext } from '../../../../context/providers/AuthContextProvider';
import classes from './navItems.module.scss';
import NavItem from './navItem/NavItem';
import { breakpoints } from '../../../../utilities/breakpoints/breakpoints';

const { laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  navIcon: {
    marginRight: '0.5em',
    color: '#07a549',
    fontSize: '30px',
    [laptopSm]: {
      display: 'none',
    },
  },
}));

const NavItems: React.FC = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  const iconsStyle = useStyles();

  return (
    <ul className={classes.navItems}>
      {isAuthenticated && <NavItem path='Diary' label='Diary' icon={<MenuBookOutlinedIcon className={iconsStyle.navIcon} />} />}
      <NavItem path='HistoricalRates?currency=USD' label='Historical Rates' icon={<ShowChartOutlinedIcon className={iconsStyle.navIcon} />} />
      <NavItem path='Banks' label='Banks Comparison' icon={<AccountBalanceIcon className={iconsStyle.navIcon} />} />
    </ul>
  );
};

export default NavItems;
