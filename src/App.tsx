import React, { Suspense } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './context/providers/AuthContextProvider';

import './index.css';
import RoutesContainer from './routes/RoutesContainer';

const App: React.FC = () => {
  const { authenticateEnd, setError, logout } = React.useContext(AuthContext);

  const userIsValid = (user: { emailVerified: boolean } | null) => {
    if (!user) return false;

    if (!user.emailVerified) {
      setError("You haven't verify your email address yet, please verify to sign in.");
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (authUser) => {
      if (userIsValid(authUser)) {
        authenticateEnd(authUser?.email as string);
      } else {
        logout();
      }
    });
  }, []);

  return (
    <Suspense fallback={<div></div>}>
      <RoutesContainer />
    </Suspense>
  );
};

export default App;
