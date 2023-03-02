import { Icon, Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  RiHashtag,
  RiFontSize,
  RiKey2Line,
  RiCalendar2Line,
  RiHeartAddFill,
  RiHeartAddLine,
} from 'react-icons/ri';

interface AttributeProps {
  type: 'q' | 'c' | 'n' | 't';
  name: string;
}

const Attribute = (props: AttributeProps) => {
  const [isPrefered, setIsPrefered] = useState(false);

  return (
    <Flex flexDir={'row'} align="center" bgColor="gray.50" py={1} px={2} borderRadius="md">
      <Icon
        as={
          props.type === 'q'
            ? RiHashtag
            : props.type === 'c'
            ? RiFontSize
            : props.type === 'n'
            ? RiKey2Line
            : props.type === 't'
            ? RiCalendar2Line
            : undefined
        }
        boxSize={3.5}
        color="gray.900"
        mr={1}
      />
      <Text fontSize={'xs'} color="gray.700" fontWeight={400}>
        {props.name}
      </Text>
      <Icon
        as={isPrefered ? RiHeartAddFill : RiHeartAddLine}
        boxSize={3.5}
        color="pink.300"
        ml={'auto'}
        cursor="pointer"
        onClick={() => setIsPrefered(!isPrefered)}
      />
    </Flex>
  );
};

export default Attribute;
