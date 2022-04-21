export interface CurrencyComparison {
  result: {
    exchangeAmount: string;
    exchangeRate: string;
  };
}
interface Rate {
  pair: string;
  directExchangeOffers: {
    buyNow: number;
    sellNow: number;
  };
}

export type RatesList = Rate[];
