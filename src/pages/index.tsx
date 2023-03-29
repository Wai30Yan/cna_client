import React, { MouseEventHandler, useState } from 'react'
import { Appointment } from '@/models/appointment'
import { Flex, Text, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Button, Stack, Container, Spacer, IconButton } from '@chakra-ui/react';
import DrawerComponent from '@/components/Drawer';
import Header from '@/components/Header';
import { GetDate, GetTime } from '@/helpers/helpers';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Doctor } from '@/models/doctor';
import { Clinic } from '@/models/clinic';
import ModalComponent from '@/components/Modal';
import UpdateModal from '@/components/UpdateModal';
import OptionsBar from '@/components/OptionsBar';

type Props = {
  data : {
    appointments: Appointment[];
    doctors: Doctor[];
    clinics: Clinic[];
  }
}

type FormData = {
  appointment_id: number;
  doctor_id: number;
  clinic_id: number;
  date: string;
  from: string;
  to: string;
}

export default function Home(props: Props) {
  const [formData, setFormData] = useState<FormData>()
  
  
  
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure()
  
  function handleEditClick(a: Appointment) {
    const data = {
      appointment_id: a.id,
      doctor_id: a.doctor_id,
      clinic_id: a.clinic_id,
      date: new Date(a.start_time).toISOString().substring(0, 10),
      from: new Date(a.start_time).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false }),
      to: new Date(a.end_time).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false }),
    }

    setFormData(data)
    onUpdateModalOpen();
  }

  async function handleDelete(a: Appointment): Promise<void> {
    const res = await fetch('/api/appointment',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'DELETE',
        'Access-Control-Request-Headers': 'Content-Type'
      },
      body: JSON.stringify({ "appointment": a }),
      mode: 'cors',
      credentials: 'include',
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <>
      <Header onOpen={onDrawerOpen} />
      <DrawerComponent isOpen={isDrawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
      
      <ModalComponent doctors={props.data.doctors} clinics={props.data.clinics} isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} />

      {formData && <UpdateModal 
        disable={true}
        isOpen={isUpdateModalOpen}
        onOpen={onUpdateModalOpen}
        onClose={onUpdateModalClose}
        doctors={props.data.doctors}
        clinics={props.data.clinics}
        formData={formData}     />}

      <OptionsBar title='Appointments List' btnName='Add Appointment' fn={onModalOpen} />
      <Spacer height='13px' />
      <TableContainer display='flex' justifyContent='center' h='100%'>
        <Flex flexDirection='row' alignItems='center' >
          <Table variant='simple'>
            <TableCaption>Appointment List</TableCaption>
            <Thead>
              <Tr >
                <Th color='blue.600'>ID</Th>
                <Th color='blue.600'>Dr.Name</Th>
                <Th color='blue.600'>Dr.Specialty</Th>
                <Th color='blue.600'>Clinic</Th>
                <Th color='blue.600'>Location</Th>
                <Th color='blue.600'>From</Th>
                <Th color='blue.600'>To</Th>
                <Th color='blue.600'>Date</Th>
                <Th color='blue.600'>Edit</Th>
                <Th color='blue.600'>Delete</Th>
              </Tr>
            </Thead>
            <Tbody >
              {props.data.appointments.map((appointment) => (
                <Tr key={appointment.id + appointment.doctor.name}>
                  <Td>{appointment.id}</Td>
                  <Td>{appointment.doctor.name}</Td>
                  <Td>{appointment.doctor.specialty}</Td>
                  <Td>{appointment.clinic.name}</Td>
                  <Td>{appointment.clinic.location}</Td>
                  <Td>{GetTime(appointment.start_time.toString())}</Td>
                  <Td>{GetTime(appointment.end_time.toString())}</Td>
                  <Td>{GetDate(appointment.start_time.toString())}</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleEditClick(appointment)}
                      variant='outline'
                      colorScheme='blue'
                      aria-label='Search database'
                      icon={<EditIcon  />}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => handleDelete(appointment)}
                      variant='outline'
                      colorScheme='red'
                      aria-label='Search database'
                      icon={<DeleteIcon  />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </TableContainer>
    </>
  )
}

export async function getStaticProps() {
  const appt = await fetch('http://cnaserver-production.up.railway.app/appointments');
  const doc = await fetch('http://cnaserver-production.up.railway.app/doctors');
  const cln = await fetch('http://cnaserver-production.up.railway.app/clinics');
  const appointments = await appt.json();
  const doctors = await doc.json();
  const clinics = await cln.json();

  const data = {appointments, doctors, clinics}

  return {
    props: { data },
  }
}
