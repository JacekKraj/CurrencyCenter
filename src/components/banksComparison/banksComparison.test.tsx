import { mount } from 'enzyme';
import { act, waitFor } from '@testing-library/react';
import moxios from 'moxios';

import { banks } from '../../utilities/ratesAPI/banks';
import axiosInstance from './../../utilities/ratesAPI/axios';
import BanksComparison from './BanksComparison';
import { findByTestAttr } from '../../utilities/tests/testsUtilityFunctions';
import { Currencies } from '../../utilities/enums/currencies';
import { getBuildedDate } from './../../utilities/helperFunctions/getBuildedDate';

jest.mock('./../utility/nav/Nav.tsx', () => {
  return () => '';
});

jest.mock('./../utility/footer/Footer.tsx', () => {
  return () => '';
});

const setup = () => {
  return mount(<BanksComparison />);
};

const currency1 = {
  sell: 1,
  buy: 1.5,
  spread: 0.5,
};

const currency2 = {
  sell: 2,
  buy: 3,
  spread: 1,
};

const currency3 = {
  sell: 0.5,
  buy: 3.5,
  spread: 3,
};

const response = {
  bgk: {
    [Currencies.EUR]: {
      ...currency1,
    },
    [Currencies.USD]: {
      ...currency2,
    },
  },
  bgz: {
    [Currencies.EUR]: {
      ...currency2,
    },
    [Currencies.USD]: {
      ...currency1,
    },
  },
  alior: {
    [Currencies.EUR]: {
      ...currency2,
    },
    [Currencies.USD]: {
      ...currency3,
    },
  },
  valid_from: new Date(),
};

const runMoxios = () => {
  const request = moxios.requests.mostRecent();
  return request.respondWith({
    status: 200,
    response,
  });
};

describe('<BanksComparison />', () => {
  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('has USD currency set by default', () => {
    const wrapper = setup();
    const comparisonHeaderCurrencyInfo = findByTestAttr(wrapper, 'comparison-header-currency-info');
    expect(comparisonHeaderCurrencyInfo.text()).toContain(Currencies.USD);
  });

  it('displays properly formated date', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios().then(() => {
          wrapper.update();
          const validFromDate = findByTestAttr(wrapper, 'valid-from-date');
          expect(validFromDate.text()).toContain(getBuildedDate(new Date()));
          done();
        });
      });
    });
  });

  it('sorst by bank name by default', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios().then(() => {
          wrapper.update();

          const bankNameFirst = findByTestAttr(wrapper, 'bank-name').first();
          const bankNameLast = findByTestAttr(wrapper, 'bank-name').last();
          expect(bankNameFirst.text()).toEqual(banks.alior);
          expect(bankNameLast.text()).toEqual(banks.bgz);
          done();
        });
      });
    });
  });

  it('sorts banks by different conditions', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios().then(() => {
          wrapper.update();
          const sortButtonBank = findByTestAttr(wrapper, 'sort-button-bank');
          const sortButtonBuy = findByTestAttr(wrapper, 'sort-button-buy');
          const sortButtonSell = findByTestAttr(wrapper, 'sort-button-sell');
          const sortButtonSpread = findByTestAttr(wrapper, 'sort-button-spread');
          const banksInOrder = [banks.bgz, banks.alior, banks.bgz, banks.alior];
          [sortButtonSpread, sortButtonBank, sortButtonBuy, sortButtonSell].forEach((button, index) => {
            button.simulate('click');
            const bankName = findByTestAttr(wrapper, 'bank-name').first();
            expect(bankName.text()).toEqual(banksInOrder[index]);
          });
          done();
        });
      });
    });
  });

  it('changes values after picking new currency', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios().then(async () => {
          wrapper.update();
          let bankName = findByTestAttr(wrapper, 'bank-name').first();
          let bankSell = findByTestAttr(wrapper, 'bank-sell').first();
          expect(bankName.text()).toEqual(banks.alior);
          expect(bankSell.text()).toEqual(currency3.sell + 'zł');
          const currencyPicker = findByTestAttr(wrapper, 'comparison-currency-picker');
          await act(async () => {
            currencyPicker.simulate('change', { target: { value: Currencies.EUR } });
          });
          moxios.wait(async () => {
            await waitFor(() => {
              runMoxios().then(async () => {
                wrapper.update();
                bankName = findByTestAttr(wrapper, 'bank-name').first();
                bankSell = findByTestAttr(wrapper, 'bank-sell').first();
                expect(bankName.text()).toEqual(banks.alior);
                expect(bankSell.text()).toEqual(currency2.sell + 'zł');
                done();
              });
            });
          });
        });
      });
    });
  });

  it('changes description after picking new currency', async () => {
    const wrapper = setup();
    await act(async () => {
      const currencyPicker = findByTestAttr(wrapper, 'comparison-currency-picker');
      currencyPicker.simulate('change', { target: { value: Currencies.EUR } });
    });

    const comparisonHeaderCurrencyInfo = findByTestAttr(wrapper, 'comparison-header-currency-info');
    expect(comparisonHeaderCurrencyInfo.text()).toContain(Currencies.EUR);
  });
});
