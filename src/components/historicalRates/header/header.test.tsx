import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './Header';
import { findByTestAttr } from '../../../utilities/tests/testsUtilityFunctions';
import { Currencies } from '../../../utilities/enums/currencies';
import HistoricalRatesContextProvider from '../../../context/providers/HistoricalRatesContextProvider';

const setup = () => {
  const history = createMemoryHistory();
  return mount(
    <Router navigator={history} location={history.location}>
      <HistoricalRatesContextProvider>
        <Header />
      </HistoricalRatesContextProvider>
    </Router>
  );
};

describe('<Header />', () => {
  it('updates page title on picking new value from currency input', () => {
    const wrapper = setup();
    let pageHeader = findByTestAttr(wrapper, 'page-header');
    expect(pageHeader.text()).toEqual('USD historical rates');
    const currencyPicker = findByTestAttr(wrapper, 'currency-picker');
    currencyPicker.simulate('change', { target: { value: Currencies.EUR } });
    pageHeader = findByTestAttr(wrapper, 'page-header');
    expect(pageHeader.text()).toEqual('EUR historical rates');
  });
});
