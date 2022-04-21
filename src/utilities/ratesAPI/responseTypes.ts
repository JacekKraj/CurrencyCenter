export interface CurrencyComparison {
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

export type FetchedRatesList = FetchedRate[];
