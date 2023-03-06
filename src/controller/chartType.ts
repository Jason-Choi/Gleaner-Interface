import { signal } from "@preact/signals-react";
import { ChartType } from "../types/ChartType";

const chartTypesSignal = signal<ChartType[]>([]);


const toggleChartTypePrefer = (target: ChartType) => {
    chartTypesSignal.value = chartTypesSignal.peek().map((chartType) => {
        if (chartType.name === target.name) {
            return {
                ...chartType,
                prefer: !chartType.prefer,
                ignore: false,
            };
        }
        return chartType;
    });
};

const toggleChartTypeIgnore = (target: ChartType) => {
    chartTypesSignal.value = chartTypesSignal.peek().map((chartType) => {
        if (chartType.name === target.name) {
            return {
                ...chartType,
                ignore: !chartType.ignore,
                prefer: false,
            };
        }
        return chartType;
    });
};

export { chartTypesSignal, toggleChartTypePrefer, toggleChartTypeIgnore }