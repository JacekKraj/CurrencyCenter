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
    <div className={classes.tableRow}>
      <p className={classnames(classes.bankName, classes.tableItem)}>{bank}</p>
      <p className={classes.tableItem}>{buy + suffix} </p>
      <p className={classes.tableItem}>{sell + suffix} </p>
      <p className={classes.tableItem}>{spread + suffix} </p>
    </div>
  );
};

export default TableRow;
