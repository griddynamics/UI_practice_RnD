import { useCallback, useRef, useEffect, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { ChartDataEntry } from "../shared/dataset";

export function useChart(
  chartData: ChartDataEntry,
  chartConstructor: Function
) {
  const chartRef = useRef(chartConstructor());
  const [chartContainerElement, setChartContainerElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    chartRef.current
      .data(chartData)
      // @ts-ignore typings don't allow custom node props passing
      .color((d) => d.color)
      // @ts-ignore
      .tooltipContent((_, node) => `Value: ${node.value}`);
  }, [chartData]);

  useResizeObserver(chartContainerElement, (entry) => {
    chartRef.current
      .width(entry.contentRect.width)
      .height(entry.contentRect.height);
  });

  return useCallback((element) => {
    if (element) {
      chartRef.current.transitionDuration(300)(element);
    }

    setChartContainerElement(element);
  }, []);
}
