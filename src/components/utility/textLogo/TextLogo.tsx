import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './../../../assets/images/TextLogo.png';

interface Props {
  className: string;
}

const TextLogo: React.FC<Props> = (props) => {
  return (
    <NavLink to='/'>
      <img src={Logo} {...props} alt='Logo with text of Currency Center' />
    </NavLink>
  );
};

export default TextLogo;
