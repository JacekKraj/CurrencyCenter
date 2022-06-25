import { mount } from 'enzyme';

import { findByTestAttr } from '../../../../utilities/tests/testsUtilityFunctions';
import HistoricalRatesContextProvider from '../../../../context/providers/HistoricalRatesContextProvider';
import Types from './Types';

const setup = () => {
  return mount(
    <HistoricalRatesContextProvider>
      <Types />
    </HistoricalRatesContextProvider>
  );
};

describe('<Types />', () => {
  it('is unable to deactivate all type checkboxes at one time', () => {
    const wrapper = setup();
    ['sell', 'buy', 'average'].filter((type) => {
      const checkboxContainer = findByTestAttr(wrapper, `${type}-type-checkbox`);
      const checkbox = checkboxContainer.find('input');
      checkbox.simulate('change', { target: { checked: false } });
    });
    const averageCheckboxContainer = findByTestAttr(wrapper, 'average-type-checkbox').last();
    const averageCheckbox = averageCheckboxContainer.find('input');
    expect(averageCheckbox.prop('checked')).toBeTruthy();
  });
});
