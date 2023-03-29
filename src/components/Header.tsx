import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Container, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  onOpen: () => void;
}

export default function Header(props: Props) {
  return (
    <Container height='80px' maxW='1920px' bg='blue.600' color='white' >
      <Flex flexDirection='row' alignItems='center' h='100%' >
          <HamburgerIcon 
            boxSize='8'
            onClick={props.onOpen}
          />
          <Box width='20px' />
          <Text fontSize='4xl'>Chan Nyein Aung</Text>
        <Spacer></Spacer>
        <Text fontSize='4xl'>Admin Dashboard</Text>
      </Flex>
    </Container>
  )
}
