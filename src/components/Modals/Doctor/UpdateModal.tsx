import { Doctor } from '@/models/doctor';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, InputGroup, Input, ModalFooter, Wrap, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from "axios"

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    doctor: Doctor;
}

function UpdateModal(props: Props) {
    const [doctor, setDoctor] = useState<Doctor>(props.doctor);
    const [newDoctor, setNewDoctor] = useState<Doctor>(props.doctor);
    const [isFormDataUpdated, setIsFormDataUpdated] = useState<boolean>(false);

    useEffect(() => {
        setDoctor(props.doctor)
        setNewDoctor(props.doctor)
    }, [props.doctor])

    useEffect(() => {
        setIsFormDataUpdated(
            doctor?.name !== newDoctor?.name ||
            doctor?.specialty !== newDoctor?.specialty
        )
    }, [newDoctor, doctor]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNewDoctor((prevState: Doctor) => ({
            ...prevState!,
            [name]: value,
        }));
        setIsFormDataUpdated(value === doctor[name]);
    }

    async function handleUpdate(): Promise<void> {
        console.log("updated", newDoctor)
        try {
            const res = await axios.put('/api/doctor', newDoctor, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                withCredentials: true
            });
            const data = await res.data
            console.log("updated doctor", data)
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
                                defaultValue={props.doctor?.name}
                                onChange={handleChange}
                                placeholder="Update Name"
                                size="md"
                                type="text" />
                        </InputGroup>
                        <InputGroup alignItems='center'>
                            <Box width='90px'>
                                <Text pr='8px'>Location:</Text>
                            </Box>
                            <Input
                                name="specialty"
                                defaultValue={props.doctor?.specialty}
                                onChange={handleChange}
                                placeholder="Update Location"
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