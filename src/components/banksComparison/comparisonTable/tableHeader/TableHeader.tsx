import React, { SetStateAction, Dispatch } from 'react';
import classnames from 'classnames';

import { SortingConditions } from '../ComparisonTable';
import classes from './tableHeader.module.scss';

interface Props {
  sortingCondition: {
    set: Dispatch<SetStateAction<SortingConditions>>;
    current: SortingConditions;
  };
}

const TableHeader: React.FC<Props> = ({ sortingCondition }) => {
  const { set, current } = sortingCondition;
  const handleClick = (condition: SortingConditions) => {
    set(condition);
  };

  const renderButtons = React.useMemo(() => {
    return Object.values(SortingConditions).map((condition) => {
      return (
        <button
          className={classnames(condition === current && classes.active)}
          onClick={() => handleClick(condition)}
          key={condition}
          data-test={`sort-button-${condition}`}
        >
          {condition}
        </button>
      );
    });
  }, [current]);

  return <div className={classes.tableHeader}>{renderButtons}</div>;
};

export default TableHeader;
