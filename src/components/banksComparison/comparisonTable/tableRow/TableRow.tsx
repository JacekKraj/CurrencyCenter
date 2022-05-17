import React from 'react';
import classnames from 'classnames';

import classes from './tableRow.module.scss';

interface Props {
  sell: string;
  buy: string;
  spread: string;
  bank: string;
  isHeader?: boolean;
}

const TableRow: React.FC<Props> = (props) => {
  const { sell, buy, spread, bank, isHeader } = props;

  const suffix = !isHeader ? 'zł' : '';
  return (
    <div className={classnames(classes.tableRow, isHeader && classes.tableHeader)}>
      <p className={classes.bankName}>{bank}</p>
      <p>{buy + suffix} </p>
      <p>{sell + suffix} </p>
      <p>{spread + suffix} </p>
    </div>
  );
};

export default TableRow;
