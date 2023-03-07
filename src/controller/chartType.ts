import { signal, computed } from '@preact/signals-react';
import { ChartType } from '../types/ChartType';
import { unSelectTaskType } from './taskType';

const chartTypesSignal = signal<ChartType[]>([]);

const targetChartTypeSignal = computed(() =>
    chartTypesSignal
        .value
        .filter((chartType) => !chartType.ignore)
        .map((chartType) => chartType.mark)
);

const chartTypeWildcardSignal = computed(() =>
    chartTypesSignal
        .value
        .filter((chartType) => chartType.prefer)
        .map((chartType) => `${chartType.name}`)
);

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
    unSelectTaskType();
    chartTypesSignal.value = chartTypesSignal.peek().map((chartType) => {
        if (chartType.name === target.name) {
            console.log(chartType.name)
            chartType.ignore = !chartType.ignore;
        }
        return chartType;
    });
};

export {
    chartTypesSignal,
    targetChartTypeSignal,
    chartTypeWildcardSignal,
    toggleChartTypePrefer,
    toggleChartTypeIgnore,
};
