import { ActionTypes } from './../actionTypes';
import { Actions } from './../actions/auth';

export interface AuthInitialState {
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string;
  userEmail: string;
}

export const initialState: AuthInitialState = {
  isAuthenticated: false,
  isLoading: false,
  errorMessage: '',
  userEmail: '',
};

export const authReducer = (state: AuthInitialState = initialState, action: Actions): AuthInitialState => {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.AUTHENTICATE_END:
      const modifiedEmial = action.userEmail.replace(/[.*+\-?^${}()|[\]@\\]/g, '');

      return {
        ...state,
        isLoading: false,
        userEmail: modifiedEmial,
        isAuthenticated: true,
      };
    case ActionTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case ActionTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.REGISTER_END:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    case ActionTypes.SET_AUTHENTICATION_ERROR:
      return {
        ...state,
        errorMessage: action.message,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userEmail: '',
        isLoading: false,
      };
    default:
      return state;
  }
};
