import React, { SetStateAction, Dispatch } from 'react';

import { SortingConditions } from '../ComparisonTable';
import classes from './tableHeader.module.scss';

interface Props {
  setSortingCondition: Dispatch<SetStateAction<SortingConditions>>;
}

const TableHeader: React.FC<Props> = ({ setSortingCondition }) => {
  const handleClick = (condition: SortingConditions) => {
    setSortingCondition(condition);
  };

  const renderButtons = () => {
    return Object.values(SortingConditions).map((condition) => {
      return (
        <button onClick={() => handleClick(condition)} key={condition}>
          {condition}
        </button>
      );
    });
  };

  return <div className={classes.tableHeader}>{renderButtons()}</div>;
};

export default TableHeader;
