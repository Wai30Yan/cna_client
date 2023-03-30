import { Appointment } from '@/models/appointment';
import { Clinic } from '@/models/clinic';
import { Doctor } from '@/models/doctor';
import { Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Modal, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Select, Box, Card, CardBody, Heading, Wrap } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    doctors: Doctor[];
    clinics: Clinic[];
}

type FormData = {
    doctor_id: number;
    clinic_id: number;
    date: string;
    from: string;
    to: string;
}

function ModalComponent(props: Props) {
    const btnRef = React.useRef(null)
    const [formData, setFormData] = useState<FormData>({
        doctor_id: 0,
        clinic_id: 0,
        date: "",
        from: "",
        to: ""
    })

    const isDisabled = !formData || Object.values(formData).some((value) => value === '' || value === 0);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        if (name === "date" || name === "from" || name === "to") {
            console.log(name, value)
            setFormData((prevState: FormData | undefined) => ({
                ...prevState!,
                [name]: value,
            }));
        } else {
            setFormData((prevState: FormData | undefined) => ({
                ...prevState!,
                [name]: Number(value),
            }));
        }
    }

    async function handleAdd(): Promise<void> {
        const doctor_id = formData?.doctor_id ?? 0;
        const clinic_id = formData?.clinic_id ?? 0;
        const date = formData?.date ?? '';
        const from = formData?.from ?? '';
        const to = formData?.to ?? '';

        const start_time = new Date(`${date}T${from}:00`)
        const end_time = new Date(`${date}T${to}:00`);
    
        const appointment: Appointment = {
            doctor_id,
            clinic_id,
            start_time,
            end_time,
            id: 0,
            doctor: {
                id: 0,
                name: '',
                specialty: ''
            },
            clinic: {
                id: 0,
                name: '',
                location: ''
            }
        }
        
        try {
            const res = await fetch('/api/appointment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Method': 'POST',
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify({ "appointment": appointment }),
                mode: 'cors',
                credentials: 'include',
            });
            const data = await res.json()
            console.log(data)
            window.location.reload()
        }
        catch (error) {
            console.log(error)
            // handle error here
        }
    }
    return (
        <>
            <Modal
                onClose={props.onClose}
                finalFocusRef={btnRef}
                isOpen={props.isOpen}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='blue.600' >Insert Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                        <Wrap >
                            <Button onClick={props.onClose}>Close</Button>
                            <Button isDisabled={isDisabled} variant='solid' colorScheme='blue' onClick={handleAdd} >Add</Button>
                        </Wrap>
                    </ModalFooter>
                </ModalContent >
            </Modal >
        </>
    )
}

export default ModalComponent