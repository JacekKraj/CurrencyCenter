import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';

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
  const iconsStyle = useStyles();

  return (
    <ul className={classes.navItems}>
      <NavItem path='' label='Home' icon={<HomeOutlinedIcon className={iconsStyle.navIcon} />} />
      <NavItem path='diary' label='Your diary' icon={<MenuBookOutlinedIcon className={iconsStyle.navIcon} />} />
      <NavItem path='rates' label='Exchange rates' icon={<ShowChartOutlinedIcon className={iconsStyle.navIcon} />} />
    </ul>
  );
};

export default NavItems;
