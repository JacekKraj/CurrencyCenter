import React, { SetStateAction, Dispatch } from 'react';

import classes from './comparisonTable.module.scss';
import { Currencies } from './../../../utilities/enums/currencies';
import { banks } from './../../../utilities/ratesAPI/banks';
import { sortObjectsByKey } from '../../../utilities/helperFunctions/sortObjectsByKey';
import TableRow from './tableRow/TableRow';
import axios from './../../../utilities/ratesAPI/axios';
import { BanksComparisonResponse, BankComparisonValues } from './../../../utilities/ratesAPI/responseTypes';
import { Endpoints } from './../../../utilities/ratesAPI/endpoints';
import TableHeader from './tableHeader/TableHeader';

export enum SortingConditions {
  BANK = 'bank',
  SELL = 'sell',
  BUY = 'buy',
  SPREAD = 'spread',
}

interface Props {
  currency: Currencies;
  setValidFrom: Dispatch<SetStateAction<Date>>;
}

interface BuildedComparison extends BankComparisonValues {
  bank: string;
}

const ComparisonTable: React.FC<Props> = ({ currency, setValidFrom }) => {
  const [comparisons, setComparisons] = React.useState<BuildedComparison[]>([]);
  const [sortingCondition, setSortingCondition] = React.useState<SortingConditions>(SortingConditions.BANK);

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
      const sortedComparisons = sortObjectsByKey(buildedComparisons, 'bank');
      setValidFrom(new Date(data.valid_from));
      setComparisons(sortedComparisons);
    };

    getComparisons();
  }, [currency]);

  React.useEffect(() => {
    const newSortedComparisons = sortObjectsByKey(comparisons, sortingCondition);
    setComparisons(newSortedComparisons);
  }, [sortingCondition]);

  return (
    <div className={classes.comparisonTable}>
      <TableHeader setSortingCondition={setSortingCondition} />
      {comparisons.map((comparison) => {
        return <TableRow key={comparison.bank} {...comparison} />;
      })}
    </div>
  );
};

export default ComparisonTable;
