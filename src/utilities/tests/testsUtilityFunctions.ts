import { ReactWrapper } from 'enzyme';

export const findByTestAttr = (wrapper: ReactWrapper, val: string) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const formikFindByInputName = (wrapper: ReactWrapper, name: string) => {
  return wrapper.find(`input[name='${name}']`);
};
