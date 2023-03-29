import { Clinic } from '@/models/clinic'
import { Box, Text, Stack, InputGroup, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
    clinic?: Clinic;
}

function ClinicForm(props: Props) {
    const [formData, setFormData] = useState<Clinic | undefined>(props.clinic)
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData((prev: Clinic | undefined) => ({
            ...prev!,
            [name]: value,
        }))
    }
    return (
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
                    name="specialty"
                    defaultValue={props.clinic?.location}
                    onChange={handleChange}
                    placeholder="Enter Location"
                    size="md"
                    type="text" />
            </InputGroup>
        </Stack>
    )
}

export default ClinicForm