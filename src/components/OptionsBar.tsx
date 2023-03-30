import { Container, Spacer, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import React from 'react'

type Props = {
    // title: string;
    btnName: string;
    fn?: () => void;
}

function OptionsBar(props: Props) {
    return (
        <Container display='flex' flexDirection='row' alignItems='center' height='80px' maxW='1920px' color='blue.600' border='1px' >
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/'>Appointment</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href='/doctors'>Dcotor</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem >
                        <BreadcrumbLink href='/clinics'>Clinic</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>
            <Spacer />
            <Button colorScheme='blue' variant='solid' onClick={props.fn}>
                {props.btnName}
            </Button>
        </Container>
    );
}

export default OptionsBar