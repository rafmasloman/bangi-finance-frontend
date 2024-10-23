import { DonutChart, DonutChartProps } from '@mantine/charts';

interface IBaseDonutChartProps extends DonutChartProps {}

const BaseDonutChart = (props: IBaseDonutChartProps) => {
  return <DonutChart thickness={30} {...props} />;
};

export default BaseDonutChart;
