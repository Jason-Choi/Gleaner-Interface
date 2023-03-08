import { signal, effect, batch } from '@preact/signals-react'
import { URI } from '../../config'
import axios from "axios"
import { CreateDashboardBody, Init } from '../types/API'
import { attributesSignal, attributeWildcardsSignal } from './attribute'
import { chartTypesSignal, chartTypeWildcardSignal, targetChartTypeSignal } from './chartType'
import { dashboardSignal } from './dashboard'
import { selectedTaskTypeSignal, taskTypesSignal } from './taskType'
import { ChartType } from '../types/ChartType'
import { numFiltersSignal, numSampleSignal, numVisSignal } from './parameters'
import { weightSignal } from './oracleWeight'

const initializedSignal = signal<boolean>(false)


effect(async () => {
    const body: CreateDashboardBody = {
        numVis: numVisSignal.peek(),
        numSample: numSampleSignal.peek(),
        numFilter: numFiltersSignal.peek(),
        weight: weightSignal.peek(),
        chartTypes: targetChartTypeSignal.peek(),
        wildcard: [],
    }
    const response = await axios.post(`${URI}/init`, body);
    const data: Init = response.data;
    batch(() => {
        initializedSignal.value = true;
        attributesSignal.value = data.attributes.map((attribute) => {
            return {
                ...attribute,
                prefer: false,
                ignore: false,
            };
        });
        chartTypesSignal.value = data.chartTypes.map((chartType) => {
            return {
                ...chartType,
                prefer: false,
                ignore: false,
            };
        });
        taskTypesSignal.value = data.taskTypes.map((taskType) => {
            return {
                ...taskType,
                chartTypes: taskType.chartTypes.map((chartType) => chartTypesSignal.peek().find((ct) => ct.name === chartType.name) as ChartType),
            };
        });

        dashboardSignal.value = data.result.vlspecs.map((vlSpec) => {
            const specObject = JSON.parse(vlSpec)
            specObject.autosize = { type: 'fit', contains: 'padding' };
            if (specObject.encoding && specObject.encoding.color) {
                specObject.encoding.color.legend = { title: null };
            }
            return specObject
        })
        selectedTaskTypeSignal.value = { ...selectedTaskTypeSignal.peek(), chartTypes: chartTypesSignal.peek() }
    });
})


export { initializedSignal }