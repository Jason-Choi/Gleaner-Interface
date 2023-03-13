import { useComputed } from '@preact/signals-react';
import { BoxPlot } from '@visx/stats';
import { scaleLinear } from '@visx/scale';
import { currentScoreSignal, resultDistributionSignal } from '../controller/dashboard';
import { weightSignal } from '../controller/oracleWeight';
type Target = 'score' | 'uniqueness' | 'coverage' | 'interestingness' | 'specificity';

interface ResultPlotProps {
  width: number;
  height: number;
  target: Target;
}

const getMinMax = (target: Target) => {
  if (target === 'score') {
    const max =
      weightSignal.value.uniqueness +
      weightSignal.value.coverage +
      weightSignal.value.interestingness +
      weightSignal.value.specificity;
    return [0, max];
  } else {
    return [0, 1];
  }
};

export const ResultPlot = ({ width, height, target }: ResultPlotProps) => {
  const resultDistribution = useComputed(() => resultDistributionSignal.value[target]);
  const sortedDistribution = useComputed(() =>
    resultDistribution.value.slice().sort((a, b) => a - b)
  );
  const stats = useComputed(() => {
    return {
      min: Math.min(...resultDistribution.value),
      max: Math.max(...resultDistribution.value),
      median: sortedDistribution.value[Math.floor(sortedDistribution.value.length / 2)],
      firstQuartile: sortedDistribution.value[Math.floor(sortedDistribution.value.length / 4)],
      thirdQuartile: sortedDistribution.value[Math.floor(sortedDistribution.value.length * 0.75)],
    };
  });
  const valueScale = useComputed(() =>
    scaleLinear({ range: [0, width * 0.8], round: true, domain: getMinMax(target) })
  );

  const currentScore = currentScoreSignal.value[target];

  return (
    <svg width={width} height={height}>
      <BoxPlot
        min={stats.value.min}
        max={stats.value.max}
        firstQuartile={stats.value.firstQuartile}
        thirdQuartile={stats.value.thirdQuartile}
        median={stats.value.median}
        boxWidth={height}
        outliers={[currentScore]}
        left={width * 0.1}
        fillOpacity={0.2}
        stroke="black"
        horizontal={true}
        valueScale={valueScale.value}
      />
    </svg>
  );
};
