import React from 'react';

import classes from './comparisonTable.module.scss';
import { Currencies } from './../../../utilities/enums/currencies';
import TableRow from './tableRow/TableRow';
import axios from 'axios';

interface Props {
  currency: Currencies;
}

const ComparisonTable: React.FC<Props> = ({ currency }) => {
  React.useEffect(() => {
    axios.get('https://klient.internetowykantor.pl/api/public/bankRates').then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className={classes.comparisonTable}>
      <TableRow bank='Bank' buy='Buy' sell='Sell' spread='Spread' isHeader />
      <TableRow bank='PKO' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Alior' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Stefczyk' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Bank pocztowy' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='PKO' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Alior' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Stefczyk' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Bank pocztowy' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='PKO' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Alior' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Stefczyk' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Bank pocztowy' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='PKO' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Alior' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
      <TableRow bank='Millenium' buy='4.4523' sell='4.2323' spread='0.3233' />
    </div>
  );
};

export default ComparisonTable;
