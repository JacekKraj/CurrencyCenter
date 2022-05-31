export const getBuildedDate = (date: Date) => {
  const month = date.getMonth() + 1;

  return `${date.getDate()}-${month > 10 ? month : `0${month}`}-${date.getFullYear()}`;
};
