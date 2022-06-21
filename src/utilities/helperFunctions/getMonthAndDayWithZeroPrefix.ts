export const getMonthAndDayWithZeroPrefix = (date: Date) => {
  let month: string | number = date.getMonth() + 1;
  month = month >= 10 ? `${month}` : `0${month}`;

  let day: string | number = date.getDate();
  day = day >= 10 ? `${day}` : `0${day}`;

  return { month, day };
};
