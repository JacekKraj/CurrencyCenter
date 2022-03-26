import React from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/providers/AuthContextProvider';
import classes from './authWrapper.module.scss';
import TextLogo from './../../utility/textLogo/TextLogo';
import SpinnerCoverage from './../../utility/spinnerCoverage/SpinnerCoverage';

interface Props {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { setError, isLoading } = React.useContext(AuthContext);

  React.useEffect(() => {
    return () => {
      setError('');
    };
  }, []);

  return (
    <React.Fragment>
      <div className={classes.backgroundCover}></div>
      <div className={classes.authWrapper}>
        <TextLogo className={classes.textLogo} />
        <div className={classes.authModal}>
          {isLoading && <SpinnerCoverage />}
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
