import { getDateForChart } from '../../../utilities/helperFunctions/getBuildedDateForChart';
import { Rates, Ranges } from './../historicalRatesReducer';
import { HistoricalRatesResponse } from '../../../utilities/ratesAPI/responseTypes';

const SELL_VALUE_INDEX = 3;
const BUY_VALUE_INDEX = 7;
const AVERAGE_VALUE_INDEX = 8;
const TIMESTAMP_INDEX = 0;

const getOneTypeRates = (
  type: {
    index: 3 | 7 | 8;
    range: Ranges;
  },
  fetchedRates: HistoricalRatesResponse
) => {
  const oneTypeRates = fetchedRates.ik_series.reduce((accumulator: Rates[], rate) => {
    const buildedRate = { value: rate[type.index], timestamp: getDateForChart(rate[TIMESTAMP_INDEX], type.range) };

    return [...accumulator, buildedRate];
  }, []);

  return oneTypeRates;
};

export const buildHistoricalRates = (fetchedRates: HistoricalRatesResponse, currentRange: Ranges) => {
  const sellRates = getOneTypeRates({ index: SELL_VALUE_INDEX, range: currentRange }, fetchedRates);
  const buyRates = getOneTypeRates({ index: BUY_VALUE_INDEX, range: currentRange }, fetchedRates);
  const averageRates = getOneTypeRates({ index: AVERAGE_VALUE_INDEX, range: currentRange }, fetchedRates);
  return { sellRates, buyRates, averageRates };
};
