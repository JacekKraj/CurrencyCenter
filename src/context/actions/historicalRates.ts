import { Currencies } from '../../utilities/enums/currencies';
import { ActionTypes } from '../actionTypes';
import { ChartsTypes, Ranges } from './../reducers/historicalRatesReducer';
import { HistoricalRatesResponse } from './../../utilities/ratesAPI/responseTypes';

interface SetCurrency {
  type: ActionTypes.SET_CURRENCY;
  currency: Currencies;
}

interface SetActiveStatus {
  type: ActionTypes.SET_ACTIVE_STATUS;
  statusToSet: ChartsTypes;
}

interface SetCurrentRange {
  type: ActionTypes.SET_CURRENT_RANGE;
  range: Ranges;
}

interface SetHistoricalRates {
  type: ActionTypes.SET_HISTORICAL_RATES;
  rates: HistoricalRatesResponse;
}

interface SetHistoricalRatesLoading {
  type: ActionTypes.SET_HISTORICAL_RATES_LOADING;
  isLoading: boolean;
}

interface SetHistoricalRatesError {
  type: ActionTypes.SET_HISTORICAL_RATES_ERROR;
  errorMessage: string;
}

export type Actions = SetCurrency | SetActiveStatus | SetCurrentRange | SetHistoricalRates | SetHistoricalRatesLoading | SetHistoricalRatesError;
