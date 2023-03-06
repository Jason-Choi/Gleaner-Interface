import { VisualizationSpec } from 'react-vega';
import type { Attribute, AttributeFetched } from './Attribute';
import type { ChartType, ChartTypeFetched } from './ChartType';
import type { OracleResult } from "./OracleResult"
import type { OracleWeight } from "./OracleWeight"


interface InitResult {
    numViews: number;
    wildcards: string[];
    score: number;
    oraclsResult: OracleResult;
    oracleWeight: OracleWeight;
    vlspecs: string[];
}


export interface InitItem {
    chartTypes: ChartTypeFetched[];
    attributes: AttributeFetched[];
    result: InitResult;
}