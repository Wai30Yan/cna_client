
import AddModal from "@/components/Modals/Doctor/AddModal";
import UpdateModal from "@/components/Modals/Doctor/UpdateModal";
import OptionsBar from "@/components/OptionsBar";
import { Doctor } from "@/models/doctor";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure, Text, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, IconButton, Button } from "@chakra-ui/react"
import { useState } from "react";

type Props = {
  doctors: Doctor[];
}

function Doctors(props: Props): JSX.Element {
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure()
  const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure()
  const doctors = props.doctors;

  const [doctor, setDoctor] = useState<Doctor>();

  function handleEditClick(d: Doctor) {
    setDoctor(d)
    onUpdateModalOpen()
  }

  async function handleDelete(d: Doctor): Promise<void> {
    try {
      const res = await fetch('/api/doctor', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Method': 'DELETE',
          'Access-Control-Request-Headers': 'Content-Type'
        },
        body: JSON.stringify({ "doctor": d }),
        mode: 'cors',
        credentials: 'include',
      })
      const data = await res.json()
      console.log(data)
      window.location.reload()
    } catch (error) {

    }
  }

  return (
    <>
      <AddModal isOpen={isAddModalOpen} onOpen={onAddModalOpen} onClose={onAddModalClose} />
      {doctor &&
        <UpdateModal doctor={doctor} isOpen={isUpdateModalOpen} onOpen={onUpdateModalOpen} onClose={onUpdateModalClose} />
      }
      <OptionsBar btnName='Add Doctor' fn={onAddModalOpen} />
      <TableContainer display='flex' justifyContent='center' h='100%'>
        <Flex  alignItems='center' >
          <Table variant='simple'>
            <TableCaption>Doctor List</TableCaption>
            <Thead>
              <Tr >
                <Th color='blue.600'>ID</Th>
                <Th color='blue.600'>Dr. Name</Th>
                <Th color='blue.600'>Dr. Specialty</Th>
                <Th color='blue.600'>Edit</Th>
                <Th color='blue.600'>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {doctors.map((doctor) => (
                <Tr key={doctor.id + doctor.name}>
                  <Td>{doctor.id}</Td>
                  <Td>{doctor.name}</Td>
                  <Td>{doctor.specialty}</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleEditClick(doctor)}
                      variant='outline'
                      colorScheme='blue'
                      aria-label='Search database'
                      icon={<EditIcon />}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => handleDelete(doctor)}
                      variant='outline'
                      colorScheme='red'
                      aria-label='Search database'
                      icon={<DeleteIcon />}
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

export default Doctors

export async function getStaticProps() {
  const res = await fetch('http://cnaserver-production.up.railway.app/doctors');
  const doctors = await res.json();

  return {
    props: { doctors },
    revalidate: 10
  }
}