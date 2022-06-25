import React from 'react';
import { useNavigate } from 'react-router';

import classes from './header.module.scss';
import CurrencyPicker from '../../utility/currencyPicker/CurrencyPicker';
import { Currencies } from '../../../utilities/enums/currencies';
import PageHeader from '../../utility/pageHeader/PageHeader';
import { HistoricalRatesContext } from '../../../context/providers/HistoricalRatesContextProvider';
import { useQuery } from '../../../utilities/hooks/useQuery';

const Header: React.FC = () => {
  const { currency, setCurrency } = React.useContext(HistoricalRatesContext);

  const navigate = useNavigate();
  let query = useQuery();

  const isValidCurrency = (currency: string) => Object.values(Currencies as unknown as string[]).includes(currency);

  React.useEffect(() => {
    let currency = query.get('currency') || '';

    if (!isValidCurrency(currency)) {
      currency = Currencies.USD;
      navigate(`/HistoricalRates?currency=${currency}`);
    }

    setCurrency(currency as Currencies);
  }, []);

  const onPickerValueChange = (currency: Currencies) => {
    navigate(`/HistoricalRates?currency=${currency}`);
    setCurrency(currency);
  };

  return (
    <div className={classes.chartHeader}>
      <PageHeader text={`${currency} historical rates`} data-test='page-header' />
      <CurrencyPicker
        className={classes.pickerAdditional}
        value={currency}
        changeValue={onPickerValueChange}
        data-test='currency-picker'
        blockedCurrencies={[Currencies.PLN]}
      />
    </div>
  );
};

export default Header;
