import { Flex } from '@chakra-ui/react';
import { Footer, Header } from './components/Layout';
import { Main } from './components/Main';
import { initializedSignal } from './controller/init';

const App = () => {
  return (
    <Flex flexDir={'column'}>
      <Header />
      {initializedSignal.value ? <Main /> : <div>Loading...</div>}
      <Footer />
    </Flex>
  );
};

export default App;
