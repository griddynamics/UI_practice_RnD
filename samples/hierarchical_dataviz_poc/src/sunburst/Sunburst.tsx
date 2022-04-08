import SunburstChart from "sunburst-chart";
import { ChartDataEntry } from "../shared/dataset";
import styles from "./Sunburst.module.css";
import { useChart } from "../shared/chart";

export interface Props {
  chartData: ChartDataEntry;
}

function Sunburst({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, SunburstChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default Sunburst;
