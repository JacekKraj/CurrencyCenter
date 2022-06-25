import { Currencies } from '../globalEnums/currencies';
import { banks } from './banks';

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

interface BanksComparison {
  [key: keyof typeof banks]: {
    [key in Currencies]: BankComparisonValues;
  };
}

interface BanksComparisonValidFrom {
  valid_from: Date;
}

export type BanksComparisonResponse = BanksComparison & BanksComparisonValidFrom;

export type SingleHistoricalRate = [number, number, number, number, number, number, number, number, number];

export interface HistoricalRatesResponse {
  ik_series: SingleHistoricalRate[];
}
