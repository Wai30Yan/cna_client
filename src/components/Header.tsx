import { Container, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

export default function Header() {
  return (
    <React.Fragment>
    <Container height='80px' maxW='1920px' bg='blue.600' color='white' >
      <Flex flexDirection='row' alignItems='center' h='100%' >
          <Text fontSize='4xl'>Chan Nyein Aung</Text>
        <Spacer></Spacer>
        <Text fontSize='4xl'>Admin Dashboard</Text>
      </Flex>
    </Container>
    </React.Fragment>
  )
}
