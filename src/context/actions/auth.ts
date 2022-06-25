import { ActionTypes } from './../actionTypes';

interface AuthenticateStart {
  type: ActionTypes.AUTHENTICATE_START;
}

interface AuthenticateEnd {
  type: ActionTypes.AUTHENTICATE_END;
  userEmail: string;
}

interface AuthenticateFail {
  type: ActionTypes.AUTHENTICATE_FAIL;
  errorMessage: string;
}

interface RegisterStart {
  type: ActionTypes.REGISTER_START;
}

interface RegisterEnd {
  type: ActionTypes.REGISTER_END;
}

interface RegisterFail {
  type: ActionTypes.REGISTER_FAIL;
  errorMessage: string;
}

interface SetAuthenticationError {
  type: ActionTypes.SET_AUTHENTICATION_ERROR;
  message: string;
}

interface Logout {
  type: ActionTypes.LOGOUT;
}

export type Actions =
  | AuthenticateStart
  | AuthenticateEnd
  | AuthenticateFail
  | RegisterStart
  | RegisterEnd
  | RegisterFail
  | SetAuthenticationError
  | Logout;
