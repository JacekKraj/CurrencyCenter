import React from 'react';

import classes from './comparisonTable.module.scss';
import { Currencies } from './../../../utilities/enums/currencies';
import { banks } from './../../../utilities/ratesAPI/banks';
import { sortByKey } from './../../../utilities/helperFunctions/sortByKey';
import TableRow from './tableRow/TableRow';
import axios from './../../../utilities/ratesAPI/axios';
import { BanksComparisonResponse, BankComparisonValues } from './../../../utilities/ratesAPI/responseTypes';
import { Endpoints } from './../../../utilities/ratesAPI/endpoints';

interface Props {
  currency: Currencies;
}

interface BuildedComparison extends BankComparisonValues {
  bank: string;
}

const ComparisonTable: React.FC<Props> = ({ currency }) => {
  const [comparisons, setComparisons] = React.useState<BuildedComparison[]>([]);

  React.useEffect(() => {
    const fetchBanksComparisons = async () => {
      return await axios.get<BanksComparisonResponse>(Endpoints.COMPARE_BANKS);
    };

    const bankIsValid = (bank: string) => !!banks[bank];

    const buildComparisons = (fetchedComaprisons: BanksComparisonResponse) => {
      const buildedComparisons: BuildedComparison[] = [];

      for (const key in fetchedComaprisons) {
        if (!bankIsValid(key)) continue;

        const buildedComparison = {
          ...fetchedComaprisons[key][currency],
          bank: banks[key],
        };
        buildedComparisons.push(buildedComparison);
      }

      return buildedComparisons;
    };

    const getComparisons = async () => {
      const { data } = await fetchBanksComparisons();
      const buildedComparisons = buildComparisons(data);
      const sortedComparisons = sortByKey(buildedComparisons, 'bank');
      setComparisons(sortedComparisons);
    };

    getComparisons();
  }, [currency]);

  return (
    <div className={classes.comparisonTable}>
      <TableRow bank='Bank' buy='Buy' sell='Sell' spread='Spread' isHeader />
      {comparisons.map((comparison) => {
        return <TableRow key={comparison.bank} {...comparison} />;
      })}
    </div>
  );
};

export default ComparisonTable;
