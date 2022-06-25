import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import { waitFor } from '@testing-library/react';

import axiosInstance from './../../utilities/ratesAPI/axios';
import HistoricalRates from './HistoricalRates';
import { findByTestAttr } from '../../utilities/tests/testsUtilityFunctions';
import HistoricalRatesContextProvider from '../../context/providers/HistoricalRatesContextProvider';
import { Currencies } from './../../utilities/enums/currencies';

jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');

  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ _, children }: { _: number; children: React.ReactNode }) => (
      <OriginalRecharts.ResponsiveContainer width={500} height={500}>
        {children}
      </OriginalRecharts.ResponsiveContainer>
    ),
  };
});

const setup = () => {
  const history = createMemoryHistory();
  return mount(
    <Router location={history.location} navigator={history}>
      <HistoricalRatesContextProvider>
        <HistoricalRates />
      </HistoricalRatesContextProvider>
    </Router>
  );
};

const resp = {
  ik_series: [
    [1655733600, 4.4305, 4.4293, 4.4347, 4.4347, 4.4005, 4.3993, 4.4047, 4.4047],
    [1655734500, 4.4318, 4.4267, 4.4325, 4.4307, 4.4018, 4.3967, 4.4025, 4.4007],
    [1655735400, 4.4287, 4.4287, 4.4333, 4.4322, 4.3987, 4.3987, 4.4033, 4.4022],
    [1655736300, 4.4308, 4.4261, 4.4318, 4.4289, 4.4008, 4.3961, 4.4018, 4.3989],
  ],
};

const runMoxios = (status: number, response: typeof resp | null) => {
  const request = moxios.requests.mostRecent();
  return request.respondWith({
    status,
    response,
  });
};

describe('<HistoricalRates />', () => {
  beforeEach(() => {
    moxios.install(axiosInstance);
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  it('shows spinner on page init', () => {
    const wrapper = setup();
    const spinner = findByTestAttr(wrapper, 'spinner');
    expect(spinner.exists()).toBeTruthy();
  });

  it('shows spinner on changing current range', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(async () => {
        runMoxios(200, resp).then(() => {
          wrapper.update();
          const range = findByTestAttr(wrapper, 'range').last();
          range.simulate('click');
          const spinner = findByTestAttr(wrapper, 'spinner');
          expect(spinner.exists()).toBeTruthy();
          done();
        });
      });
    });
  });

  it('shows spinner on changing currency', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(async () => {
        runMoxios(200, resp).then(() => {
          wrapper.update();
          const currencyPicker = findByTestAttr(wrapper, 'currency-picker');
          currencyPicker.simulate('change', { target: { value: Currencies.EUR } });
          const spinner = findByTestAttr(wrapper, 'spinner');
          expect(spinner.exists()).toBeTruthy();
          done();
        });
      });
    });
  });

  it('hides a chart line on deactivating type checkbox', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios(200, resp).then(() => {
          wrapper.update();
          const checkboxContainer = findByTestAttr(wrapper, `average-type-checkbox`);
          const checkbox = checkboxContainer.find('input');
          checkbox.simulate('change', { target: { checked: false } });
          const averageLine = findByTestAttr(wrapper, 'average-chart-line');
          expect(averageLine.prop('hide')).toBeTruthy();
          done();
        });
      });
    });
  });

  it('shows error message when request fails', (done) => {
    const wrapper = setup();
    moxios.wait(async () => {
      await waitFor(() => {
        runMoxios(400, null).then(() => {
          wrapper.update();
          const chartError = findByTestAttr(wrapper, 'chart-error');
          expect(chartError.exists()).toBeTruthy();
          done();
        });
      });
    });
  });
});
