import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './footerIcon.module.scss';

interface Props {
  Icon: React.ReactNode;
  path: string;
}

const FooterIcon: React.FC<Props> = ({ Icon, path }) => {
  return (
    <a href={path} className={classes.footerIcon} target='blank'>
      {Icon}
    </a>
  );
};

export default FooterIcon;
