import { getMonthAndDayWithZeroPrefix } from './getMonthAndDayWithZeroPrefix';

export const getBuildedDate = (date: Date) => {
  const { day, month } = getMonthAndDayWithZeroPrefix(date);

  return `${day}-${month}-${date.getFullYear()}`;
};
