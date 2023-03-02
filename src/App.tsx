import { Button, Flex, Input, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Attribute from './components/Attribute';
import { chartTypes, ChartTypeSelector } from './components/ChartTypeSelector';
import ChartView from './components/ChartView';
import { Footer, Header, Section } from './components/Layout';
import WeightSlider from './components/WeightSlider';
const App = () => {
  return (
    <Flex flexDir={'column'}>
      <Header />
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

            <WeightSlider title="Specificity" />
            <WeightSlider title="Interestingness" />
            <WeightSlider title="Coverage" />
            <WeightSlider title="Uniqueness" />
          </Section>
          <Section title="Parameters" gap={1.5} collapsed>
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
            {chartTypes.map((chartType) => ChartTypeSelector(chartType))}
          </Section>

          <Section title="Attributes" gap={1.5} collapsed>
            <Attribute type="n" name="Name" />
            <Attribute type="c" name="Type" />
            <Attribute type="t" name="Release Date" />
            <Attribute type="q" name="Net Profit" />
          </Section>
        </Flex>
        <SimpleGrid w="full" h="auto" spacing={4} minChildWidth={300} maxBlockSize={200}>
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
          <ChartView />
        </SimpleGrid>
        <VStack w={300}>
          <Section title="Recommend Chart" gap={1.5}></Section>
        </VStack>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default App;
