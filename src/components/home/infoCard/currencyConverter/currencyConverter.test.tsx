import { mount, ReactWrapper } from 'enzyme';
import moxios from 'moxios';
import { waitFor } from '@testing-library/react';

import { Currencies } from '../../../../utilities/enums/currencies';
import axiosInstance from './../../../../utilities/ratesAPI/axios';
import CurrencyConverter from './CurrencyConverter';
import { findByTestAttr } from '../../../../utilities/tests/testsUtilityFunctions';
import { act } from 'react-dom/test-utils';

const setup = () => {
  return mount(<CurrencyConverter />);
};

const getTestedElements = (wrapper: ReactWrapper) => {
  return {
    receiveValueInput: findByTestAttr(wrapper, 'receive-value-input'),
    haveValueInput: findByTestAttr(wrapper, 'have-value-input'),
    receiveCurrencyInput: findByTestAttr(wrapper, 'receive-currency-input'),
    haveCurrencyInput: findByTestAttr(wrapper, 'have-currency-input'),
    rate: findByTestAttr(wrapper, 'currency-rate'),
  };
};

const runMoxios = (exchange: { rate: string; amount: string }) => {
  const request = moxios.requests.mostRecent();
  return request.respondWith({
    status: 200,
    response: {
      result: {
        exchangeRate: exchange.rate,
        exchangeAmount: exchange.amount,
      },
    },
  });
};

describe('<CurrencyConverter />', () => {
  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('displays value in receive input and correct rate on page init', (done) => {
    const wrapper = setup();

    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios({ rate: '4', amount: '25' }).then(() => {
          wrapper.update();
          const { rate, receiveValueInput } = getTestedElements(wrapper);
          expect(rate.text()).toEqual('4');
          expect(receiveValueInput.prop('value')).toEqual(25);
          done();
        });
      });
    });
  });

  it('swaps input values and currencies on clicking swap button', (done) => {
    const wrapper = setup();

    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios({ rate: '4', amount: '25' }).then(() => {
          wrapper.update();
          const swapButton = findByTestAttr(wrapper, 'swap-button').first();
          swapButton.simulate('click');
          const { receiveCurrencyInput, haveCurrencyInput, receiveValueInput, haveValueInput } = getTestedElements(wrapper);
          // 100, PLN, USD are initial values
          expect(receiveValueInput.prop('value')).toEqual(100);
          expect(haveValueInput.prop('value')).toEqual(25);
          expect(receiveCurrencyInput.prop('value')).toEqual(Currencies.PLN);
          expect(haveCurrencyInput.prop('value')).toEqual(Currencies.USD);
          done();
        });
      });
    });
  });

  it('changes second currency on trying to pick two currencies different from PLN', async () => {
    const wrapper = setup();
    const { haveCurrencyInput } = getTestedElements(wrapper);
    await act(async () => {
      haveCurrencyInput.simulate('change', { target: { value: Currencies.EUR } });
    });
    wrapper.setProps({});
    const { receiveCurrencyInput } = getTestedElements(wrapper);
    expect(receiveCurrencyInput.prop('value')).toEqual(Currencies.PLN);
  });

  it('changes second currency on trying to pick two PLN currencies', async () => {
    const wrapper = setup();
    const { receiveCurrencyInput } = getTestedElements(wrapper);
    await act(async () => {
      receiveCurrencyInput.simulate('change', { target: { value: Currencies.PLN } });
    });
    wrapper.setProps({});
    const { haveCurrencyInput } = getTestedElements(wrapper);
    expect(haveCurrencyInput.prop('value')).toEqual(Currencies.USD);
  });
});
