import { VisualizationSpec } from "react-vega";

interface StatisticFeature {
    [key: string]: (string | null)[]
}

interface ChartView {
    index: number;
    spec: VisualizationSpec | any;
    isPinned: boolean;
    statistic_feature: StatisticFeature;
}

export type { ChartView, StatisticFeature };
