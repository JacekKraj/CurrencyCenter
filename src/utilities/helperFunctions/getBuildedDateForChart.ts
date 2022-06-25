import { Ranges } from '../../context/reducers/historicalRatesReducer';
import { getMonthAndDayWithZeroPrefix } from './getMonthAndDayWithZeroPrefix';

const CONVERSION_TO_MILLISECONDS_FACTOR = 1000;

export const getDateForChart = (unbuildedDate: number, range: Ranges) => {
  const date = new Date(unbuildedDate * CONVERSION_TO_MILLISECONDS_FACTOR);

  if (range === Ranges.ONE_DAY) {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    return `${hours}:${minutes < 10 ? `${minutes}0` : minutes}`;
  }
  const { day, month } = getMonthAndDayWithZeroPrefix(date);

  return `${day}.${month}`;
};
