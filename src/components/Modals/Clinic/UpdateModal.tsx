import { Clinic } from '@/models/clinic';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, InputGroup, Input, ModalFooter, Wrap, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    clinic: Clinic;
}

function UpdateModal(props: Props) {
    const [clinic, setClinic] = useState<Clinic>(props.clinic);
    const [newCln, setNewCln] = useState<Clinic>(props.clinic);
    const [isFormDataUpdated, setIsFormDataUpdated] = useState<boolean>(false);

    useEffect(() => {
        setClinic(props.clinic)
        setNewCln(props.clinic)
    }, [props.clinic])

    useEffect(() => {
        setIsFormDataUpdated(
            clinic?.name !== newCln?.name ||
            clinic?.location !== newCln?.location
        )
    }, [newCln, clinic]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNewCln((prevState: Clinic) => ({
            ...prevState!,
            [name]: value,
        }));
        setIsFormDataUpdated(value === clinic[name]);
    }

    async function handleUpdate(): Promise<void> {
        try {
            const res = await axios.put('/api/clinic', newCln, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            const data = await res.data
            console.log("updated clinic",data)
            // window.location.reload()
        }
        catch (error) {
            console.log(error)
            // handle error here
        }
    }
    return (
        <Modal
            onClose={props.onClose}
            isOpen={props.isOpen}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color='blue.600' >Insert Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <InputGroup alignItems='center'>
                            <Box width='90px'>
                                <Text pr='8px'>Name:</Text>
                            </Box>
                            <Input
                                name="name"
                                defaultValue={props.clinic?.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                size="md"
                                type="text" />
                        </InputGroup>
                        <InputGroup alignItems='center'>
                            <Box width='90px'>
                                <Text pr='8px'>Location:</Text>
                            </Box>
                            <Input
                                name="location"
                                defaultValue={props.clinic?.location}
                                onChange={handleChange}
                                placeholder="Enter Location"
                                size="md"
                                type="text" />
                        </InputGroup>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Wrap >
                        <Button onClick={props.onClose}>Close</Button>
                        <Button isDisabled={!isFormDataUpdated} variant='solid' colorScheme='blue' onClick={handleUpdate} >Update</Button>
                    </Wrap>
                </ModalFooter>
            </ModalContent >
        </Modal >
    )
}

export default UpdateModal