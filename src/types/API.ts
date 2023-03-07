import type { AttributeFetched } from './Attribute';
import type { ChartTypeFetched } from './ChartType';
import type { OracleResult } from "./OracleResult";
import type { OracleWeight } from "./OracleWeight";
import { TaskTypeFetched } from './TaskType';


interface Result {
    numViews: number;
    wildcards: string[];
    score: number;
    oraclsResult: OracleResult;
    oracleWeight: OracleWeight;
    vlspecs: string[];
}


interface Init {
    chartTypes: ChartTypeFetched[];
    taskTypes: TaskTypeFetched[];
    attributes: AttributeFetched[];
    result: Result;
}

interface CreateDashboardBody {
    numVis: number
    numSample: number
    numFilter: number
    weight: OracleResult
    chartTypes: string[]
    wildcard: string[]
}

export type { Result, Init, CreateDashboardBody };
