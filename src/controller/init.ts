import { signal, effect, batch } from '@preact/signals-react'
import { URI } from '../../config'
import axios from "axios"
import { Init } from '../types/API'
import { attributesSignal } from './attribute'
import { chartTypesSignal } from './chartType'
import { dashboardSignal } from './dashboard'
import { selectedTaskTypeSignal, taskTypesSignal } from './taskType'
import { ChartType } from '../types/ChartType'

const initializedSignal = signal<boolean>(false)


effect(async () => {
    console.log("init effect")
    const response = await axios.get(`${URI}/init`);
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

        dashboardSignal.value = data.result.vlspecs.map((vlSpec) => JSON.parse(vlSpec));
        selectedTaskTypeSignal.value = { ...selectedTaskTypeSignal.peek(), chartTypes: chartTypesSignal.peek() }
    });
})


export { initializedSignal }