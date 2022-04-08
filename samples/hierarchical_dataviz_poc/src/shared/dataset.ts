import { scaleSequential } from "d3";
import { interpolateRdYlBu } from "d3-scale-chromatic";
import faker from "@faker-js/faker";

export interface ChartDataEntry {
  name: string;
  value: number;
  color: string;
  children?: ChartDataEntry[];
}

export interface ChartData {
  data: ChartDataEntry;
  nodesCount: number;
}

export const DEFAULT_LEVELS = 5;
export const DEFAULT_MIN_CHILDREN = 3;
export const DEFAULT_MAX_CHILDREN = 10;
const MAX_VALUE = 5000;
const DEFAULT_PARAMS = {
  levels: DEFAULT_LEVELS,
  minChildren: DEFAULT_MIN_CHILDREN,
  maxChildren: DEFAULT_MAX_CHILDREN,
};

const colorFn = scaleSequential()
  .domain([MAX_VALUE, 0])
  .interpolator(interpolateRdYlBu);

export interface RandomDataGenerationParams {
  levels: number;
  minChildren: number;
  maxChildren: number;
}

export function generateRandomChartData({
  levels,
  minChildren,
  maxChildren,
}: RandomDataGenerationParams = DEFAULT_PARAMS): ChartData {
  let nodesCount = 0;

  function generateRandomChartDataEntry(
    name = "root",
    level = 0
  ): ChartDataEntry {
    const value = faker.datatype.number({ max: MAX_VALUE });

    nodesCount++;
    return {
      name,
      value,
      color: colorFn(value),
      children:
        level < levels
          ? [
              ...Array(
                faker.datatype.number({ min: minChildren, max: maxChildren })
              ),
            ].map(() =>
              generateRandomChartDataEntry(faker.lorem.word(), ++level)
            )
          : undefined,
    };
  }

  return { data: generateRandomChartDataEntry(), nodesCount };
}

export function isChartDataEntry(data: any): data is ChartDataEntry {
  return (
    data &&
    typeof data === "object" &&
    typeof data.name === "string" &&
    typeof data.value === "number" &&
    typeof data.color === "string" &&
    (!data.children ||
      (Array.isArray(data.children) && data.children.every(isChartDataEntry)))
  );
}

export function countChartDataEntries(
  dataEntry: ChartDataEntry,
  nodesCount = 0
): number {
  if (!dataEntry.children) {
    return 0;
  }

  dataEntry.children.forEach((child) => {
    nodesCount++;
    countChartDataEntries(child, nodesCount);
  });

  return nodesCount;
}
