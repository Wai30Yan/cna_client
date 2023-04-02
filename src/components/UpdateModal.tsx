import { Appointment } from '@/models/appointment';
import { Clinic } from '@/models/clinic';
import { Doctor } from '@/models/doctor';
import { Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Modal, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Select, Box, Card, CardBody, Heading, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    doctors: Doctor[];
    clinics: Clinic[];
    formData: FormData;
    disable: boolean;
}

type FormData = {
    appointment_id: number;
    doctor_id: number;
    clinic_id: number;
    date: string;
    from: string;
    to: string;
    [key: string]: any;
}

function UpdateModal(props: Props) {
    const doc = props.doctors.find(doctor => doctor.id === props.formData.doctor_id)
    const cln = props.clinics.find(clinic => clinic.id === props.formData.clinic_id)

    const [formData, setFormData] = useState<FormData>(props.formData);
    const [newFormData, setNewFormData] = useState<FormData>(props.formData);
    const [isFormDataUpdated, setIsFormDataUpdated] = useState<boolean>(props.disable);
    console.log(newFormData)

    useEffect(() => {
        setFormData(props.formData)
        setNewFormData(props.formData)
    }, [props.formData])

    useEffect(() => {
        setIsFormDataUpdated(
            formData.clinic_id !== newFormData.clinic_id ||
            formData.doctor_id !== newFormData.doctor_id ||
            formData.date !== newFormData.date ||
            formData.from !== newFormData.from ||
            formData.to !== newFormData.to 
        )
    }, [newFormData, formData]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        if (name === "date" || name === "from" || name === "to") {
            setNewFormData((prevState: FormData | undefined) => ({
                ...prevState!,
                [name]: value,
            }));
            setIsFormDataUpdated(value === formData[name]);
        } else {
            setNewFormData((prevState: FormData | undefined) => ({
                ...prevState!,
                [name]: Number(value),
            }));
            setIsFormDataUpdated(value === formData[name]);
        }
        console.log(name, value)
    }

    async function handleUpdate(): Promise<void> {
        setIsFormDataUpdated(false);
        const id = newFormData?.appointment_id ?? 0;
        const doctor_id = newFormData?.doctor_id ?? 0;
        const clinic_id = newFormData?.clinic_id ?? 0;
        const date = newFormData?.date ?? '';
        const from = newFormData?.from ?? '';
        const to = newFormData?.to ?? '';

        const start_time = new Date(`${date}T${from}:00`)
        const end_time = new Date(`${date}T${to}:00`);

        const appointment: Appointment = {
            id,
            doctor_id,
            clinic_id,
            start_time,
            end_time,
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
        console.log(newFormData, appointment)

        try {
            const res = await fetch('/api/appointment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'PUT',
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

    function handleClose() {
        setIsFormDataUpdated(false);
        props.onClose();
    }

    return (
        <>
            <Modal
                onClose={props.onClose}
                isOpen={props.isOpen}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='blue.600' >Modify Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup flex='column' alignItems='center'>
                                <Box width='70px'>
                                    <Text pr='8px'>Doctor:</Text>
                                </Box>
                                {doc && <Select defaultValue={doc.id} name="doctor_id" onChange={handleChange} size='md'>
                                    {props.doctors.map(doctor => (
                                        <option key={doctor.id + doctor.name} value={doctor.id}>
                                            {doctor.name} - {doctor.specialty}
                                        </option>
                                    ))}
                                </Select>}
                            </InputGroup>
                            <InputGroup alignItems='center'>
                                <Box width='70px'>
                                    <Text pr='8px'>Clinic:</Text>
                                </Box>
                                {cln && <Select defaultValue={cln.id} name="clinic_id" onChange={handleChange} size='md'>
                                    {props.clinics.map(clinic => (
                                        <option key={clinic.id + clinic.name} value={clinic.id}>
                                            {clinic.name} - {clinic.location}
                                        </option>
                                    ))
                                    }
                                </Select>}
                            </InputGroup>
                            <InputGroup alignItems='center'>
                                <Box width='70px'>
                                    <Text pr='8px'>Date:</Text>
                                </Box>
                                <Input
                                    min={new Date().toISOString().split('T')[0]}
                                    value={newFormData.date}
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
                                    defaultValue={props.formData.from}
                                    name="from"
                                    onChange={handleChange}
                                    placeholder="from"
                                    size="md"
                                    type="time" />
                            </InputGroup>
                            <InputGroup alignItems='center'>
                                <Box width='70px'>
                                    <Text pr='8px'>To:</Text>
                                </Box>
                                <Input
                                    defaultValue={props.formData.to}
                                    name="to"
                                    onChange={handleChange}
                                    placeholder="to"
                                    size="md"
                                    type="time" />
                            </InputGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Wrap >
                            <Button onClick={handleClose}>Close</Button>
                            <Button isDisabled={!isFormDataUpdated} variant='solid' colorScheme='blue' onClick={handleUpdate} >Update</Button>
                        </Wrap>
                    </ModalFooter>
                </ModalContent >
            </Modal >
        </>
    )
}

export default UpdateModal