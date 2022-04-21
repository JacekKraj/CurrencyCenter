import React from 'react';

import classes from './rates.module.scss';
import Rate, { Props as RateProps } from './rate/Rate';
import { Currencies, CurrenciesParis } from '../../../utilities/enums/currencies';
import axios from './../../../utilities/ratesAPI/axios';
import { Endpoints } from '../../../utilities/ratesAPI/endpoints';
import { RatesList } from '../../../utilities/ratesAPI/responseTypes';

const Rates: React.FC = () => {
  const [rates, setRates] = React.useState<RateProps[]>([]);

  React.useEffect(() => {
    const fetchRatesFromServer = () => {
      return axios.get<RatesList>(Endpoints.RATES);
    };

    const getRelevantRates = (fatchedRates: RatesList) => {
      return fatchedRates.filter((rate) => {
        return Object.keys(CurrenciesParis).includes(rate.pair);
      });
    };

    const buildRates = (relevantRates: RatesList) => {
      return relevantRates.map((rate) => {
        return {
          currency: rate.pair.slice(0, 3) as Currencies,
          values: {
            sell: rate.directExchangeOffers.sellNow,
            buy: rate.directExchangeOffers.buyNow,
          },
        };
      });
    };

    const getRates = async () => {
      const { data } = await fetchRatesFromServer();
      const relevantRates = getRelevantRates(data);
      const buildedRates = buildRates(relevantRates);

      setRates(buildedRates);
    };

    getRates();
  }, []);

  return (
    <div className={classes.ratesComponentWrapper}>
      <div className={classes.ratesComponent}>
        <h3 className={classes.ratesHeader}>Best current rates</h3>
        <div className={classes.ratesContainer}>
          {rates.map((rate) => {
            return <Rate currency={rate.currency} values={rate.values} key={rate.currency} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Rates;
