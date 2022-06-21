import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import classes from './chart.module.scss';
import { HistoricalRatesContext } from '../../../context/providers/HistoricalRatesContextProvider';
import { colors } from '../../../utilities/colorsForJs/colorsForJs';
import CustomTooltip from './customTooltip/CustomTooltip';
import Spinner from '../../utility/spinner/Spinner';
import ChartError from './chartError/ChartError';

const Chart: React.FC = () => {
  const { getHistoricalRates, currentRange, sellRates, buyRates, averageRates, isActiveStatus, isLoading, currency, errorMessage } =
    React.useContext(HistoricalRatesContext);

  React.useEffect(() => {
    getHistoricalRates();
  }, [currentRange, currency]);

  const getChartData = () => {
    const { sell, buy, average } = isActiveStatus;
    const chartData = [...sellRates].map((_, index) => {
      return {
        sellValue: sell ? sellRates[index].value : null,
        buyValue: buy ? buyRates[index].value : null,
        averageValue: average ? averageRates[index].value : null,
        timestamp: sellRates[index].timestamp,
      };
    });

    return chartData || [];
  };

  const chart = (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={getChartData()}>
        <Line type='linear' dataKey='sellValue' stroke={colors.chartBlue} dot={false} strokeWidth={2} />
        <Line type='linear' dataKey='buyValue' stroke={colors.chartRed} dot={false} strokeWidth={2} />
        <Line type='linear' dataKey='averageValue' stroke={colors.chartGray} dot={false} strokeWidth={2} />
        <Tooltip content={<CustomTooltip />} />
        <XAxis dataKey='timestamp' tickMargin={5} minTickGap={30} />
        <YAxis padding={{ top: 10, bottom: 10 }} domain={['dataMin', 'dataMax']} />
      </LineChart>
    </ResponsiveContainer>
  );

  return <div className={classes.container}>{isLoading ? <Spinner /> : errorMessage ? <ChartError /> : chart}</div>;
};

export default Chart;
