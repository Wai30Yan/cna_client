import { Text, Container, Spacer, Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
    title: string;
    btnName: string;
    fn?: () => void;
}

function OptionsBar(props: Props) {
    return (
        <Container display='flex' flexDirection='row' alignItems='center' height='80px' maxW='1920px' color='blue.600' border='1px' >
            <Text display='flex' justifyContent='center' fontSize='3xl'>{props.title}</Text>
            <Spacer />
            <Button colorScheme='blue' variant='solid' onClick={props.fn}>
                {props.btnName}
            </Button>
        </Container>
    )
}

export default OptionsBar