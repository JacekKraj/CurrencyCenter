export enum Endpoints {
  COMAPRE_CURRENCIES = 'directExchangeCompare/BUY',
  RATES = 'marketBrief',
  COMPARE_BANKS = 'bankRates',
  HISTORICAL_RATES = 'marketHistory',
}

export enum HistoricalRatesEnpoints {
  ONE_DAY = '1-day/15m',
  ONE_WEEK = '7-days/1h',
  ONE_MONTH = '1-month/1d',
  THREE_MONTHS = '3-months/1d',
  SIX_MONTHS = '6-months/1d',
  ONE_YEAR = '1-year/1d',
}
