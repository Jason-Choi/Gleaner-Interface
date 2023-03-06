import { signal, effect, batch } from '@preact/signals-react'
import { URI } from '../../config'
import axios from "axios"
import { InitItem } from '../types/Init'
import { attributesSignal } from './attribute'
import { chartTypesSignal } from './chartType'
import { dashboardSignal } from './dashboard'

const initializedSignal = signal<InitItem | null>(null);

effect(async () => {
    const response = await axios.get(`${URI}/init`);
    const data: InitItem = response.data;
    batch(() => {
        initializedSignal.value = data;
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
        dashboardSignal.value = data.result.vlspecs.map((vlSpec) => JSON.parse(vlSpec));
    });
})


export { initializedSignal }