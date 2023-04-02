import { Doctor } from '@/models/doctor';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, InputGroup, Input, ModalFooter, Wrap, Button } from '@chakra-ui/react';
import React, { useState } from 'react'

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

function AddModal(props: Props) {
    const [doctor, setDoctor] = useState<Doctor>({
        id: 0,
        name: '',
        specialty: ''
    })
    const isDisabled = !doctor || Object.values(doctor).some((value) => value === '');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setDoctor((prev: Doctor) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleAdd(): Promise<void> {
        console.log("adding doctor", doctor)
        try {
            const res = await fetch('/api/doctor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify(doctor),
                mode: 'cors',
                credentials: 'include',
            })

            const data = await res.json()
            console.log("successfully added doctor", data)     
            // window.location.reload()       
        } catch (error) {
            
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
                        name="specialty"
                        onChange={handleChange}
                        placeholder="Enter Specialty"
                        size="md"
                        type="text" />
                </InputGroup>
            </Stack>
        </ModalBody>
        <ModalFooter>
            <Wrap >
                <Button onClick={props.onClose}>Close</Button>
                <Button isDisabled={isDisabled} variant='solid' colorScheme='blue' onClick={handleAdd} >Add</Button>
            </Wrap>
        </ModalFooter>
    </ModalContent >
</Modal >
  )
}

export default AddModal