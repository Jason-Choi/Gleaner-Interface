import { Center, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { RiDeleteBinLine, RiLineChartLine, RiMore2Fill } from 'react-icons/ri';
import type { VisualizationSpec } from 'react-vega';
import { VegaLite } from 'react-vega';

interface ChartViewProps {
  spec: VisualizationSpec;
  scores?: {
    importance: number;
    specificity: number;
    interestingness: number;
  };
}

const ChartView = (props: ChartViewProps) => {
  return (
    <Flex
      flexDir={'column'}
      w={'full'}
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
      <Center height="full" px={4}>
        <VegaLite width={350} height={200} spec={props.spec} actions={false} />
      </Center>
      {/* <Divider />
      <Text>Importance</Text>
      <Text>Statistical Feature (Correlation, Ourlier, Skew, Kurosis, ANOVA, Chi-square)</Text>
      <Text>Specified Wildcard</Text> */}
    </Flex>
  );
};

export default ChartView;
