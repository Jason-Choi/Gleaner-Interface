import { signal } from '@preact/signals-react'
import axios from 'axios'
import { VisualizationSpec } from 'react-vega'
import { URI } from '../../config'
import type { CreateDashboardBody, Result } from '../types/API'
import { attributeWildcardsSignal } from './attribute'
import { chartTypeWildcardSignal, targetChartTypeSignal } from './chartType'
import { weightSignal } from './oracleWeight'
import { numFiltersSignal, numSampleSignal, numVisSignal } from './parameters'

const dashboardSignal = signal<VisualizationSpec[]>([])

const createDashboard = async () => {
    const body: CreateDashboardBody = {
        numVis: numVisSignal.peek(),
        numSample: numSampleSignal.peek(),
        numFilter: numFiltersSignal.peek(),
        weight: weightSignal.peek(),
        chartTypes: targetChartTypeSignal.peek(),
        wildcard: [...chartTypeWildcardSignal.peek(), ...attributeWildcardsSignal.peek()],
    }
    console.log(body)
    const response = await axios.post(`${URI}/create_dashboard`, body)
    const data: { result: Result } = response.data

    dashboardSignal.value = data.result.vlspecs.map((vlSpec) => {
        const specObject = JSON.parse(vlSpec)
        specObject.autosize = { type: 'fit', contains: 'padding' };
        if (specObject.encoding && specObject.encoding.color) {
            specObject.encoding.color.legend = { title: null };
        }
        return specObject
    })
}

const removeChart = async (spec: VisualizationSpec) => {
    dashboardSignal.value = dashboardSignal.peek().filter((s) => s !== spec)
}

export { dashboardSignal, createDashboard, removeChart }
