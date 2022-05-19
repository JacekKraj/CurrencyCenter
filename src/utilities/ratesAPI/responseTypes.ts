import { Currencies } from '../enums/currencies';

export interface CurrencyComparisonResponse {
  result: {
    exchangeAmount: string;
    exchangeRate: string;
  };
}
interface FetchedRate {
  pair: string;
  directExchangeOffers: {
    buyNow: number;
    sellNow: number;
  };
}

export type FetchedRatesResponse = FetchedRate[];

export interface BankComparisonValues {
  buy: string;
  sell: string;
  spread: string;
}

export type BanksComparisonResponse = {
  [key: string]: {
    [key in Currencies]: BankComparisonValues;
  };
};
