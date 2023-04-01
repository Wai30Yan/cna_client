import { Clinic } from '@/models/clinic';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, InputGroup, Input, ModalFooter, Wrap, Button } from '@chakra-ui/react'

import React, { useState } from 'react'

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

function AddModal(props: Props) {
    const [clinic, setClinic] = useState<Clinic>({
        id: 0,
        name: '',
        location: ''
    })
    const isDisabled = !clinic || Object.values(clinic).some((value) => value === '');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setClinic((prev: Clinic) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleAdd(): Promise<void> {
        try {
            console.log("adding", clinic)
            const res = await fetch('/api/clinic', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify({ "clinic": clinic }),
                mode: 'cors',
                credentials: 'include',
            })

            const data = await res.json()
            console.log("successfully add clinic", data)
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
                        name="location"
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
                <Button isDisabled={isDisabled} variant='solid' colorScheme='blue' onClick={handleAdd} >Add</Button>
            </Wrap>
        </ModalFooter>
    </ModalContent >
</Modal >
  )
}

export default AddModal