import { Clinic } from '@/models/clinic';
import { Doctor } from '@/models/doctor';
import { Text, Stack, InputGroup, Select, Input, Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
    doctors: Doctor[];
    clinics: Clinic[];
}

function AppointmentForm(props: Props) {
    
    function handleChange(evert: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

    }
  return (
    <Stack spacing={4}>
    <InputGroup flex='column' alignItems='center'>
        <Box width='70px'>
        <Text pr='8px'>Doctor:</Text>
        </Box>
        <Select name="doctor_id" onChange={handleChange} size='md'>
            <option>Assign a Doctor</option>
            {props.doctors.map(doctor => (
                <option key={doctor.id + doctor.name} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                </option>
            ))
            }
        </Select>
    </InputGroup>
    <InputGroup alignItems='center'>
    <Box width='70px'>
        <Text pr='8px'>Clinic:</Text>
        </Box>
        <Select name="clinic_id" onChange={handleChange} size='md'>
            <option>Pick a Clinic</option>
            {props.clinics.map(clinic => (
                <option key={clinic.id + clinic.name} value={clinic.id}>
                    {clinic.name} - {clinic.location}
                </option>
            ))
            }
        </Select>
    </InputGroup>
    <InputGroup alignItems='center'>
    <Box width='70px'>
        <Text pr='8px'>Date:</Text>
        </Box>
        <Input
            min={new Date().toISOString().split('T')[0]}
            name="date"
            onChange={handleChange}
            placeholder="Select Date and Time"
            size="md"
            type="date" />
    </InputGroup>
    <InputGroup alignItems='center'>
    <Box width='70px'>
        <Text pr='8px'>From:</Text>
        </Box>
        <Input
            name="from"
            onChange={handleChange}
            placeholder="Select Date and Time"
            size="md"
            type="time" />
    </InputGroup>
    <InputGroup alignItems='center'>
        <Box width='70px'>
        <Text pr='8px'>To:</Text>
        </Box>
        <Input
            name="to"
            onChange={handleChange}
            placeholder="Select Date and Time"
            size="md"
            type="time" />
    </InputGroup>
</Stack>
  )
}

export default AppointmentForm