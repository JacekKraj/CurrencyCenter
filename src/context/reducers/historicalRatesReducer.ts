import { ActionTypes } from '../actionTypes';
import { Currencies } from './../../utilities/enums/currencies';
import { Actions } from './../actions/historicalRates';
import { buildHistoricalRates } from './reducersUtilFunctions/historicalRates';

export enum Ranges {
  ONE_DAY = '1 day',
  ONE_WEEK = '1 week',
  ONE_MONTH = '1 month',
  THREE_MONTHS = '3 months',
  SIX_MONTHS = '6 months',
  ONE_YEAR = '1 year',
}

export type ChartsTypes = 'sell' | 'buy' | 'average';

export type IsActiveStatus = {
  [key in ChartsTypes]: boolean;
};

export interface Rates {
  value: number;
  timestamp: string;
}

export interface HistoricalRatesInitialState {
  currency: Currencies;
  currentRange: Ranges;
  isActiveStatus: IsActiveStatus;
  sellRates: Rates[];
  buyRates: Rates[];
  averageRates: Rates[];
  isLoading: boolean;
  errorMessage: string;
}

export const initialState: HistoricalRatesInitialState = {
  currency: Currencies.USD,
  currentRange: Ranges.ONE_DAY,
  isActiveStatus: {
    sell: true,
    buy: true,
    average: true,
  },
  sellRates: [],
  buyRates: [],
  averageRates: [],
  isLoading: true,
  errorMessage: '',
};

export const historicalRatesReducer = (state: HistoricalRatesInitialState = initialState, action: Actions): HistoricalRatesInitialState => {
  switch (action.type) {
    case ActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      };
    case ActionTypes.SET_ACTIVE_STATUS:
      return {
        ...state,
        isActiveStatus: {
          ...state.isActiveStatus,
          [action.statusToSet]: !state.isActiveStatus[action.statusToSet],
        },
      };
    case ActionTypes.SET_CURRENT_RANGE:
      return {
        ...state,
        currentRange: action.range,
      };
    case ActionTypes.SET_HISTORICAL_RATES:
      return {
        ...state,
        ...buildHistoricalRates(action.rates, state.currentRange),
        isLoading: false,
        errorMessage: '',
      };
    case ActionTypes.SET_HISTORICAL_RATES_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ActionTypes.SET_HISTORICAL_RATES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
