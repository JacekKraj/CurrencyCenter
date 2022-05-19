export const sortByKey = <T extends object, K extends keyof T>(elements: T[], key: K): T[] => {
  const compare = (a: T, b: T) => {
    if (a[key] > b[key]) return 1;

    if (a[key] < b[key]) return -1;

    return 0;
  };

  return [...elements].sort(compare);
};
