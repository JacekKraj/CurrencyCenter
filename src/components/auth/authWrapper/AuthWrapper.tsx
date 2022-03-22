import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './authWrapper.module.scss';
import TextLogo from './../../utility/textLogo/TextLogo';

interface Props {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <div className={classes.backgroundCover}></div>
      <div className={classes.authWrapper}>
        <TextLogo className={classes.textLogo} />
        <div className={classes.authModal}>
          {children}
          <p className={classes.regulationsWarning}>
            You accept{' '}
            <NavLink to='/Regulations'>
              <span className={classes.regulationsLink}>rules and regulations.</span>
            </NavLink>{' '}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthWrapper;
