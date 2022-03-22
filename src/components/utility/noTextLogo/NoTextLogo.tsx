import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './../../../assets/images/Logo.png';

interface Props {
  className: string;
}

const NoTextLogo: React.FC<Props> = (props) => {
  return (
    <NavLink to='/'>
      <img src={Logo} {...props} alt='Logo of Currency Center' />
    </NavLink>
  );
};

export default NoTextLogo;
