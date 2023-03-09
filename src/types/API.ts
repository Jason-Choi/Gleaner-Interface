import type { AttributeFetched } from './Attribute';
import type { ChartTypeFetched } from './ChartType';
import { StatisticFeature } from './ChartView';
import type { OracleResult } from "./OracleResult";
import type { OracleWeight } from "./OracleWeight";
import { TaskTypeFetched } from './TaskType';


interface Result {
    num_views: number;
    wildcards: string[];
    score: number;
    oracls_result: OracleResult;
    oracle_weight: OracleWeight;
    vlspecs: string[];
    indices: number[];
    statistic_features: StatisticFeature[];
}



interface Init {
    chartTypes: ChartTypeFetched[];
    taskTypes: TaskTypeFetched[];
    attributes: AttributeFetched[];
    result: Result;
}

interface SampleBody {
    indices: number[]
    numVis: number
    numSample: number
    numFilter: number
    weight: OracleResult
    chartTypes: string[]
    wildcard: string[]
}

export type { Result, Init, SampleBody };
