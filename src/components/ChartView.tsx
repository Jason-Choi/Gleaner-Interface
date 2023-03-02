import {
  AspectRatio,
  Center,
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { RiDeleteBinLine, RiLineChartLine, RiMore2Fill } from 'react-icons/ri';
import type { TopLevelSpec as Spec } from 'vega-lite';
import { VegaLite } from 'react-vega';

interface ChartViewProps {
  spec: Spec;
  scores: {
    importance: number;
    specificity: number;
    interestingness: number;
  };
}
const ChartView = (props: ChartViewProps) => {
  const spec: Spec = {
    mark: 'bar',
    encoding: {
      x: { field: 'a', type: 'ordinal' },
      y: { field: 'b', type: 'quantitative' },
    },
    data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
  };

  const barData = {
    table: [
      { a: 'A', b: 28 },
      { a: 'B', b: 55 },
      { a: 'C', b: 43 },
      { a: 'D', b: 91 },
      { a: 'E', b: 81 },
      { a: 'F', b: 53 },
      { a: 'G', b: 19 },
      { a: 'H', b: 87 },
      { a: 'I', b: 52 },
    ],
  };
  //   return <VegaLite spec={spec} data={barData} actions={false} />;
  return (
    <Flex
      flexDir={'column'}
      w={'full'}
      h={'fit-content'}
      bgColor="white"
      borderRadius={'md'}
      boxShadow="sm"
      p={2}
      gap={2}
    >
      <Flex flexDir={'row'} justifyContent={'space-between'}>
        <Text></Text>
        <Menu>
          <MenuButton>
            <Icon as={RiMore2Fill} boxSize={4} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<RiDeleteBinLine size={16} />}>Remove Chart</MenuItem>
            <MenuItem icon={<RiLineChartLine size={16} />}>Related Chart</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Center width={'full'}>
        <VegaLite spec={spec} data={barData} actions={false} />
      </Center>
      <Divider />
      <Text>Importance</Text>
      <Text>Statistical Feature (Correlation, Ourlier, Skew, Kurosis, ANOVA, Chi-square)</Text>
      <Text>Specified Wildcard</Text>
    </Flex>
  );
};

export default ChartView;
