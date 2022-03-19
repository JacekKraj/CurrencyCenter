import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navItem.module.scss';

interface Props {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<Props> = ({ path, label, icon }) => {
  return (
    <li>
      <NavLink className={classes.navItem} to={`/${path}`}>
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
