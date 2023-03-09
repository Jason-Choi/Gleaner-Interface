import { computed, signal } from '@preact/signals-react';
import axios from 'axios';
import { URI } from '../../config';
import type { Result, SampleBody } from '../types/API';
import { ChartView } from '../types/ChartView';
import { attributeWildcardsSignal } from './attribute';
import { chartTypeWildcardSignal, targetChartTypeSignal } from './chartType';
import { weightSignal } from './oracleWeight';
import { numFiltersSignal, numSampleSignal, numVisSignal } from './parameters';

const dashboardSignal = signal<ChartView[]>([]);

const isProcessingSignal = signal<boolean>(false);

const pinnedChartSignal = computed<number[]>(() =>
    dashboardSignal.value.filter((chart) => chart.isPinned).map((chart) => chart.index)
);


const sampleBodySignal = computed<SampleBody>(() => {
    return {
        indices: pinnedChartSignal.value,
        numVis: numVisSignal.value,
        numSample: numSampleSignal.value,
        numFilter: numFiltersSignal.value,
        weight: weightSignal.value,
        chartTypes: targetChartTypeSignal.value,
        wildcard: [...chartTypeWildcardSignal.value, ...attributeWildcardsSignal.value],
    };
});

const setDashboardSignalFromResult = (result: Result) => {
    dashboardSignal.value = result.vlspecs.map((vlSpec, i) => {
        const specObject = JSON.parse(vlSpec);

        specObject.autosize = { type: 'fit', contains: 'padding' };
        if (specObject.encoding && specObject.encoding.color) {
            specObject.encoding.color.legend = { title: null };
        }

        return {
            index: result.indices[i],
            spec: specObject,
            isPinned: pinnedChartSignal.peek().includes(result.indices[i]),
            statistic_feature: result.statistic_features[i],
        };
    });
};

const sampleDashboard = async () => {
    console.log(sampleBodySignal.peek());
    const response = await axios.post(`${URI}/sample`, sampleBodySignal.peek());
    setDashboardSignalFromResult(response.data.result as Result);
    isProcessingSignal.value = false;
};

const removeChart = (index: number) => {
    dashboardSignal.value = dashboardSignal.peek().filter((s) => s.index !== index);
};

const togglePinChart = (index: number) => {
    dashboardSignal.value = dashboardSignal.peek().map((s) => {
        if (s.index === index)
            return {
                ...s,
                isPinned: !s.isPinned,
            };
        return s;
    });
};

export {
    dashboardSignal,
    sampleDashboard,
    removeChart,
    togglePinChart,
    sampleBodySignal,
    setDashboardSignalFromResult,
    isProcessingSignal
};
