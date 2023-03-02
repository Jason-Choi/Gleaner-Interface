import { Checkbox, Flex, Text, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import {
  RiHeartAddFill,
  RiHeartAddLine,
  RiCloseCircleFill,
  RiCloseCircleLine,
} from 'react-icons/ri';

interface ChartType {
  name: string;
  mark: string;
}

const chartTypes: ChartType[] = [
  {
    name: 'Bar Chart',
    mark: 'bar',
  },
  {
    name: 'Line Chart',
    mark: 'line',
  },
  {
    name: 'Pie Chart',
    mark: 'pie',
  },
  {
    name: 'Scatterplot',
    mark: 'circle',
  },
  {
    name: 'Area Chart',
    mark: 'area',
  },
  {
    name: 'Heatmap',
    mark: 'rect',
  },
  {
    name: 'Boxplot',
    mark: 'boxplot',
  },
  {
    name: 'Strip Plot',
    mark: 'tick',
  },
];

const ChartTypeSelector = (chartType: ChartType) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isPrefered, setIsPrefered] = useState(false);

  return (
    <Flex flexDir={'row'} align="center" bgColor="gray.50" py={1} px={2} borderRadius="md">
      <Text fontSize={'xs'} color="gray.700" fontWeight={400}>
        {chartType.name}
      </Text>
      <Icon
        as={isRemoved ? RiCloseCircleFill : RiCloseCircleLine}
        boxSize={3.5}
        color="red.300"
        ml={'auto'}
        mr={1}
        cursor="pointer"
        onClick={() => setIsRemoved(!isRemoved)}
      />
      <Icon
        as={isPrefered ? RiHeartAddFill : RiHeartAddLine}
        boxSize={3.5}
        color="pink.300"
        cursor="pointer"
        onClick={() => setIsPrefered(!isPrefered)}
      />
    </Flex>
  );
};

export { chartTypes, ChartTypeSelector };
