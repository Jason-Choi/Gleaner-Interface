import { Center, Flex, Icon, Text } from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbExchange } from 'react-icons/tb';
import { VegaLite } from 'react-vega';
import { Handler } from 'vega-tooltip';
import { removeChart } from '../controller/dashboard';

interface ChartViewProps {
  spec: any;
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
      <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
        <Icon mr={4} as={TbExchange} boxSize={4} onClick={() => {}} />
        <Text w="full" fontWeight={600} fontSize={'xs'} textAlign="center">
          {props.spec.description}
        </Text>
        <Icon
          ml={4}
          as={RiDeleteBinLine}
          boxSize={4}
          onClick={() => {
            removeChart(props.spec);
          }}
        />
      </Flex>
      <Center height="full" px={4}>
        <VegaLite
          height={200}
          width={350}
          spec={props.spec}
          actions={false}
          tooltip={new Handler().call}
        />
      </Center>
      {/* <Divider />
      <Text>Importance</Text>
      <Text>Statistical Feature (Correlation, Ourlier, Skew, Kurosis, ANOVA, Chi-square)</Text>
    <Text>Specified Wildcard</Text> */}
    </Flex>
  );
};

export default ChartView;
