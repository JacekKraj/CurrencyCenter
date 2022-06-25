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
    const chartData = [...sellRates].map((_, index) => {
      return {
        sellValue: sellRates[index].value,
        buyValue: buyRates[index].value,
        averageValue: averageRates[index].value,
        timestamp: sellRates[index].timestamp,
      };
    });
    return chartData || [];
  };

  const chart = (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={getChartData()}>
        <Line
          type='linear'
          dataKey='sellValue'
          stroke={colors.chartBlue}
          dot={false}
          hide={!isActiveStatus.sell}
          strokeWidth={2}
          data-test='sell-chart-line'
        />
        <Line
          type='linear'
          dataKey='buyValue'
          stroke={colors.chartRed}
          dot={false}
          strokeWidth={2}
          hide={!isActiveStatus.buy}
          data-test='buy-chart-line'
        />
        <Line
          type='linear'
          dataKey='averageValue'
          stroke={colors.chartGray}
          hide={!isActiveStatus.average}
          dot={false}
          strokeWidth={2}
          data-test='average-chart-line'
        />
        <Tooltip content={<CustomTooltip />} />
        <XAxis dataKey='timestamp' tickMargin={5} minTickGap={30} />
        <YAxis padding={{ top: 10, bottom: 10 }} domain={['dataMin', 'dataMax']} />
      </LineChart>
    </ResponsiveContainer>
  );

  return <div className={classes.container}>{isLoading ? <Spinner /> : errorMessage ? <ChartError /> : chart}</div>;
};

export default Chart;
