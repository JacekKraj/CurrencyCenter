import React from 'react';

import { HistoricalRatesInitialState, initialState, historicalRatesReducer, ChartsTypes, Ranges } from './../reducers/historicalRatesReducer';
import { ActionTypes } from './../actionTypes';
import { Currencies } from './../../utilities/enums/currencies';
import axios from './../../utilities/ratesAPI/axios';
import { Endpoints, HistoricalRatesEnpoints } from './../../utilities/ratesAPI/endpoints';
import { HistoricalRatesResponse } from './../../utilities/ratesAPI/responseTypes';
import { getCatchErrorMessage } from './../../utilities/helperFunctions/getCatchErrorMessage';

interface Props {
  children: React.ReactNode;
}

interface HistoricalRatesContextType extends HistoricalRatesInitialState {
  setCurrency: (currency: Currencies) => void;
  setActiveStatus: (statusToSet: ChartsTypes) => void;
  setCurrentRange: (range: Ranges) => void;
  getHistoricalRates: () => void;
}

const initialContext: HistoricalRatesContextType = {
  ...initialState,
  setCurrency: () => ({}),
  setActiveStatus: () => ({}),
  setCurrentRange: () => ({}),
  getHistoricalRates: () => ({}),
};

export const HistoricalRatesContext = React.createContext<HistoricalRatesContextType>(initialContext);

const HistoricalRatesContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(historicalRatesReducer, initialState);

  const setCurrency = (currency: Currencies) => {
    dispatch({ type: ActionTypes.SET_CURRENCY, currency });
  };

  const setActiveStatus = (statusToSet: ChartsTypes) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_STATUS, statusToSet });
  };

  const setCurrentRange = (range: Ranges) => {
    dispatch({ type: ActionTypes.SET_CURRENT_RANGE, range });
  };

  function getRangesKeyByValue(value: Ranges) {
    const index = Object.values(Ranges).indexOf(value);
    return Object.keys(Ranges)[index] as keyof typeof HistoricalRatesEnpoints;
  }

  const getSpecifiedHistoricalRatesEndpoint = () => {
    let endpoint: HistoricalRatesEnpoints = HistoricalRatesEnpoints.ONE_DAY;

    Object.values(Ranges).forEach((range) => {
      if (state.currentRange === range) {
        const key = getRangesKeyByValue(range);
        endpoint = HistoricalRatesEnpoints[key];
      }
    });

    return endpoint;
  };

  const setHistoricalRates = (rates: HistoricalRatesResponse) => {
    dispatch({ type: ActionTypes.SET_HISTORICAL_RATES, rates });
  };

  const setHistoricalRatesLoading = (isLoading: boolean) => {
    dispatch({ type: ActionTypes.SET_HISTORICAL_RATES_LOADING, isLoading });
  };

  const setHistoricalRatesError = (errorMessage: string) => {
    dispatch({ type: ActionTypes.SET_HISTORICAL_RATES_ERROR, errorMessage });
  };

  const getHistoricalRates = async () => {
    const specifiedEndpoint = getSpecifiedHistoricalRatesEndpoint();
    setHistoricalRatesLoading(true);
    try {
      const fetchedRates = await axios.get<HistoricalRatesResponse>(`${Endpoints.HISTORICAL_RATES}/${state.currency}_PLN/${specifiedEndpoint}`);
      setHistoricalRates(fetchedRates.data);
    } catch (error) {
      const errorMessage = getCatchErrorMessage(error);
      setHistoricalRatesError(errorMessage);
    }
  };

  const value = { ...state, setCurrency, setActiveStatus, setCurrentRange, getHistoricalRates };

  return <HistoricalRatesContext.Provider value={value}>{children}</HistoricalRatesContext.Provider>;
};

export default HistoricalRatesContextProvider;
