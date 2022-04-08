import TreemapChart from "treemap-chart";
import { ChartDataEntry } from "../shared/dataset";
import styles from "./Treemap.module.css";
import { useChart } from "../shared/chart";
export interface Props {
  chartData: ChartDataEntry;
}

function Treemap({ chartData }: Props) {
  const chartContainerRef = useChart(chartData, TreemapChart);

  return <div className={styles.chartContainer} ref={chartContainerRef}></div>;
}

export default Treemap;
