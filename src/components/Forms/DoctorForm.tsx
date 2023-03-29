import { Doctor } from '@/models/doctor'
import { Text, Box, Stack, InputGroup, Select, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
    doctor?: Doctor;
}

function DoctorForm(props: Props) {
    const [formData, setFormDate] = useState<Doctor | undefined>(props.doctor)
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormDate((prev: Doctor | undefined) => ({
            ...prev!,
            [name]: value
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
                    defaultValue={props.doctor?.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    size="md"
                    type="text" />
            </InputGroup>
            <InputGroup alignItems='center'>
                <Box width='90px'>
                    <Text pr='8px'>Specialty:</Text>
                </Box>
                <Input
                    name="specialty"
                    defaultValue={props.doctor?.specialty}
                    onChange={handleChange}
                    placeholder="Enter Specialty"
                    size="md"
                    type="text" />
            </InputGroup>
        </Stack>
    )
}

export default DoctorForm