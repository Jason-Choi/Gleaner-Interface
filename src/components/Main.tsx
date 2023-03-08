import { Button, Flex, Input, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { attributesSignal } from '../controller/attribute';
import { chartTypesSignal } from '../controller/chartType';
import { createDashboard, dashboardSignal } from '../controller/dashboard';
import {
  numFiltersSignal,
  numSampleSignal,
  numVisSignal,
  setNumFilters,
  setNumSample,
  setNumVis,
} from '../controller/parameters';
import { selectedTaskTypeSignal, taskTypesSignal } from '../controller/taskType';
import Attribute from './AttributeSelector';
import { ChartTypeSelector } from './ChartTypeSelector';
import ChartView from './ChartView';
import { Footer, Section } from './Layout';
import WeightSlider from './WeightSlider';

export const Main = () => {
  return (
    <Flex w="full" minH="80vh" flexDir={'row'} justifyContent="space-between" px={4} gap={4}>
      <Flex flexDir={'column'} w={200} gap={2} h="fit-content">
        <Button
          boxShadow={'sm'}
          colorScheme="blue"
          bgColor="#5677A4"
          color="white"
          size="xs"
          w="full"
          onClick={createDashboard}
        >
          Create Dashboard
        </Button>

        <Section title="Analytic Task" gap={1.5}>
          <Select
            placeholder="User Task"
            size="xs"
            value={selectedTaskTypeSignal.value.name}
            onChange={(e) => {
              selectedTaskTypeSignal.value = taskTypesSignal.value.find(
                (taskType) => taskType.name === e.target.value
              )!;
            }}
          >
            {taskTypesSignal.value.map((taskType, i) => (
              <option key={`taskType-${i}`}>{taskType.name}</option>
            ))}
          </Select>

          <WeightSlider title="specificity" />
          <WeightSlider title="interestingness" />
          <WeightSlider title="coverage" />
          <WeightSlider title="uniqueness" />
        </Section>
        <Section title="Parameters" gap={1.5} w={200}>
          <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
            <Text fontSize={'xs'}># of Charts</Text>
            <Input
              size={'xs'}
              width={10}
              variant={'outline'}
              value={numVisSignal.value}
              onChange={(e) => {
                setNumVis(parseInt(e.target.value));
              }}
            />
          </Flex>
          <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
            <Text fontSize={'xs'}># of Samples</Text>
            <Input
              size={'xs'}
              width={10}
              variant={'outline'}
              value={numSampleSignal.value}
              onChange={(e) => {
                setNumSample(parseInt(e.target.value));
              }}
            />
          </Flex>
          <Flex flexDir={'row'} justifyContent={'space-between'} align="center">
            <Text fontSize={'xs'}># of Filters</Text>
            <Input
              size={'xs'}
              width={10}
              variant={'outline'}
              value={numFiltersSignal.value}
              onChange={(e) => {
                setNumFilters(parseInt(e.target.value));
              }}
            />
          </Flex>
        </Section>
        <Section title="Chart Types" gap={1.5}>
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
      <SimpleGrid w="full" h="fit-content" spacing={4} minChildWidth={350}>
        {dashboardSignal.value.map((chart, i) => (
          <ChartView spec={chart} scores={undefined} key={`chart-${i}`} />
        ))}
      </SimpleGrid>
      <VStack w={300}>
        <Section title="Dashboard Info" gap={1.5} minH={200}></Section>
        <Section title="Recommend Chart" gap={1.5} minH={700}></Section>
      </VStack>
    </Flex>
  );
};
