import { Button, Collapse, Flex, FlexProps, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { GiShipWheel } from 'react-icons/gi';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

const Header = () => {
  return (
    <Flex align="center" justifyContent="space-between" px={4} py={2}>
      <Flex alignItems={'center'}>
        <Icon as={GiShipWheel} mr={1} boxSize={6} color="gray.500" />
        <Heading size="md" variant={'layout'} alignItems="center">
          VisTiller
        </Heading>
      </Flex>
      <Link href="https://github.com/jason-choi/vis-tiller" isExternal>
        <Button variant={'layout'} leftIcon={<AiFillGithub />}>
          GitHub
        </Button>
      </Link>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex mt="auto" align="center" py={2} px={4} flexDir="column" alignItems="start" bottom={0}>
      <Link href="https://idclab.skku.edu" isExternal>
        <Flex>
          <Text variant={'layout'} fontFamily="Rajdhani" fontWeight={900} fontSize="xl">
            IDC
          </Text>
          <Text variant={'layout'} fontFamily="Rajdhani" fontSize="xl">
            Lab
          </Text>
        </Flex>
      </Link>

      <Link href="https://skku.edu" isExternal>
        <Text variant={'layout'} fontSize="sm">
          Sungkyunkwan University
        </Text>
      </Link>
      <Link href="https://cs.skku.edu" isExternal>
        <Text variant={'layout'} fontSize="sm">
          College of Computing and Informatics
        </Text>
      </Link>
    </Flex>
  );
};

interface SectionProps extends FlexProps {
  title: string;
  collapsed?: boolean;
}
const Section = (props: SectionProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(!props.collapsed);
  }, [props.collapsed]);

  return (
    <Flex
      flexDir={'column'}
      w="full"
      gap={props.gap}
      p={2}
      bgColor="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading variant={'section'}>{props.title}</Heading>
        {show ? (
          <Icon
            as={RiArrowDownSLine}
            boxSize={4}
            onClick={() => {
              setShow(!show);
            }}
          />
        ) : (
          <Icon
            as={RiArrowUpSLine}
            boxSize={4}
            onClick={() => {
              setShow(!show);
            }}
          />
        )}
      </Flex>
      <Collapse in={show} animateOpacity>
        <Flex
          flexDir={'column'}
          w="full"
          gap={props.gap}
          bgColor="white"
          borderRadius="md"
          boxShadow="sm"
        >
          {props.children}
        </Flex>
      </Collapse>
    </Flex>
  );
};

export { Header, Footer, Section };
