import React, { Suspense } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './context/providers/AuthContextProvider';

import './index.css';
import RoutesContainer from './routes/RoutesContainer';
import RouteLoader from './components/utility/routeLoader/RouteLoader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

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

    onAuthStateChanged(auth, async (authUser) => {
      if (userIsValid(authUser)) {
        authenticateEnd(authUser?.email as string);
      } else {
        logout();
      }
      setIsLoading(false);
    });
  }, []);

  return <Suspense fallback={<RouteLoader />}>{isLoading ? <RouteLoader /> : <RoutesContainer />}</Suspense>;
};

export default App;
