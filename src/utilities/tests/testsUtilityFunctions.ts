import { ReactWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ReactWrapper, val: string) => {
  return wrapper.find(`[data-test='${val}']`);
};
