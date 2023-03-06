import { Button, Flex, Input, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { attributesSignal } from '../controller/attribute';
import { chartTypesSignal } from '../controller/chartType';
import { dashboardSignal } from '../controller/dashboard';
import Attribute from './AttributeSelector';
import { ChartTypeSelector } from './ChartTypeSelector';
import ChartView from './ChartView';
import { Section } from './Layout';
import WeightSlider from './WeightSlider';

export const Main = () => {
  return (
    <Flex
      w="full"
      minH="80vh"
      flexDir={'row'}
      justifyContent="space-between"
      px={4}
      gap={4}
      mb={20}
    >
      <Flex flexDir={'column'} w={200} gap={2} h="fit-content">
        <Button
          boxShadow={'sm'}
          colorScheme="blue"
          bgColor="#5677A4"
          color="white"
          size="xs"
          w="full"
        >
          Create Dashboard
        </Button>

        <Section title="Analytic Task" gap={1.5}>
          <Select placeholder="Predefined Task" size="xs">
            <option value="Compare">Compare</option>
            <option value="Correlate">Correlate</option>
          </Select>

          <WeightSlider title="specificity" />
          <WeightSlider title="interestingness" />
          <WeightSlider title="coverage" />
          <WeightSlider title="uniqueness" />
        </Section>
        <Section title="Parameters" gap={1.5} collapsed w={200}>
          <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
            <Text fontSize={'xs'}># of Samples</Text>
            <Input size={'xs'} width={10} variant={'outline'} value={12} />
          </Flex>
          <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
            <Text fontSize={'xs'}># of Filters</Text>
            <Input size={'xs'} width={10} variant={'outline'} value={1} />
          </Flex>
        </Section>
        <Section title="Chart Types" gap={1.5} collapsed>
          {chartTypesSignal.value.map((chartType, i) => (
            <ChartTypeSelector chartType={chartType} key={`chartType-${i}`} />
          ))}
        </Section>

        <Section title="Attributes" gap={1.5} w={200}>
          {attributesSignal.value.map((attribute, i) => (
            <Attribute attribute={attribute} key={`attribute-${i}`} />
          ))}
        </Section>
      </Flex>
      <SimpleGrid w="full" h="fit-content" spacing={4} minChildWidth={350} maxBlockSize={200}>
        {dashboardSignal.value.map((chart, i) => (
          <ChartView spec={chart} scores={undefined} key={`chart-${i}`} />
        ))}
      </SimpleGrid>
      <VStack w={300}>
        <Section title="Recommend Chart" gap={1.5}></Section>
      </VStack>
    </Flex>
  );
};
