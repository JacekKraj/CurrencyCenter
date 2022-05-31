const getFormatedValues = <T>(value1: T, value2: T) => {
  if (typeof value1 === 'string' && typeof value2 === 'string')
    return {
      value1: value1.toLowerCase(),
      value2: value2.toLowerCase(),
    };

  return { value1, value2 };
};

export const sortObjectsByKey = <T extends object, K extends keyof T>(elements: T[], key: K): T[] => {
  const compare = (object1: T, object2: T) => {
    const { value1, value2 } = getFormatedValues(object1[key], object2[key]);

    if (value1 > value2) return 1;

    if (value1 < value2) return -1;

    return 0;
  };

  return [...elements].sort(compare);
};
