import React from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthInitialState, initialState, authReducer } from './../reducers/authReducer';
import { ActionTypes } from './../actionTypes';
import { getCatchErrorMessage } from './../../utilities/helperFunctions/getCatchErrorMessage';

interface Props {
  children: React.ReactNode;
}

interface AuthContextType extends AuthInitialState {
  register: (email: string, password: string) => void;
  setError: (message: string) => void;
  authenticate: (email: string, password: string) => void;
  authenticateEnd: (userEmail: string) => void;
  logout: () => void;
}

interface Location {
  prevLocation: string;
}

const initialContext: AuthContextType = {
  ...initialState,
  register: () => ({}),
  setError: () => ({}),
  authenticate: () => ({}),
  authenticateEnd: () => ({}),
  logout: () => ({}),
};

export const AuthContext = React.createContext<AuthContextType>(initialContext);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as Location;

  const setError = (message: string) => {
    dispatch({ type: ActionTypes.SET_AUTHENTICATION_ERROR, message });
  };

  const registerStart = () => {
    dispatch({ type: ActionTypes.REGISTER_START });
  };

  const registerEnd = () => {
    dispatch({ type: ActionTypes.REGISTER_END });
  };

  const registerFail = (errorMessage: string) => {
    dispatch({ type: ActionTypes.REGISTER_FAIL, errorMessage });
  };

  const register = async (email: string, password: string) => {
    registerStart();

    try {
      const auth = getAuth();

      const credential = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(credential.user);

      navigate('/SignIn');
      registerEnd();
    } catch (error) {
      const message = getCatchErrorMessage(error);
      registerFail(message);
    }
  };

  const authenticateStart = () => {
    dispatch({ type: ActionTypes.AUTHENTICATE_START });
  };

  const authenticateEnd = (userEmail: string) => {
    dispatch({ type: ActionTypes.AUTHENTICATE_END, userEmail });
  };

  const authenticateFail = (errorMessage: string) => {
    dispatch({ type: ActionTypes.AUTHENTICATE_FAIL, errorMessage });
  };

  const navigateAfterAuthenticate = () => {
    const pathToNavigate = locationState?.prevLocation || '/';
    navigate(pathToNavigate);
  };

  const authenticate = async (email: string, password: string) => {
    authenticateStart();
    try {
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, email, password);

      navigateAfterAuthenticate();
    } catch (error) {
      const message = getCatchErrorMessage(error);

      authenticateFail(message);
    }
  };

  const logout = async () => {
    const auth = getAuth();

    await signOut(auth);

    dispatch({ type: ActionTypes.LOGOUT });
  };

  const value = { ...state, register, setError, authenticate, authenticateEnd, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
