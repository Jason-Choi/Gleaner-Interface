import { signal } from '@preact/signals-react'
import { VisualizationSpec } from 'react-vega'

const dashboardSignal = signal<VisualizationSpec[]>([])

export { dashboardSignal }