import type { FlexProps } from '@chakra-ui/react';
import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface WeightSliderProps extends FlexProps {
  title: string;
}
const WeightSlider = (props: WeightSliderProps) => {
  const [value, setValue] = useState(0);
  return (
    <Flex flexDir="column">
      <Flex flexDir={'row'} justifyContent={'space-between'}>
        <Text fontSize={'xs'}>{props.title}</Text>
        <Text fontSize={'xs'} fontWeight={600}>
          {value}
        </Text>
      </Flex>
      <Slider
        aria-label={`slider-ex-${props.title}`}
        value={value}
        min={-2}
        max={2}
        step={1}
        width={'full'}
        onChange={setValue}
      >
        <SliderTrack bgColor={'orange'}>
          <SliderFilledTrack bgColor={'blue.400'} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>
  );
};

export default WeightSlider;
