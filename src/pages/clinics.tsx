import AddModal from "@/components/Modals/Clinic/AddModal";
import UpdateModal from "@/components/Modals/Clinic/UpdateModal";
import OptionsBar from "@/components/OptionsBar";
import { Clinic } from "@/models/clinic"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure, TableContainer, Flex, Table, TableCaption, Thead, Tr, Th, Tbody, Td, IconButton } from "@chakra-ui/react";
import { useState } from 'react';

type Props = {
    clinics: Clinic[];
}
function Clincs(props: Props) {
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();
    const { isOpen: isUpdateModalOpen, onOpen: onUpdateModalOpen, onClose: onUpdateModalClose } = useDisclosure();
    const clinics = props.clinics;

    const [cln, setCln] = useState<Clinic>();

    function handleEditClick(c: Clinic) {
        setCln(c);
        onUpdateModalOpen();
    }

    async function handleDelete(c: Clinic): Promise<void> {
        try {
            const res = await fetch('/api/clinic', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'DELETE',
                    'Access-Control-Request-Headers': 'Content-Type'
                  },
                  body: JSON.stringify({ "clinic": c }),
                  mode: 'cors',
                  credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
            // window.location.reload()
        } catch (err: any) {
            console.log(err)
        }
    }
    return (
        <>
            <AddModal isOpen={isAddModalOpen} onOpen={onAddModalOpen} onClose={onAddModalClose} />
            {cln &&
                <UpdateModal 
                    clinic={cln} 
                    isOpen={isUpdateModalOpen} 
                    onOpen={onUpdateModalOpen} 
                    onClose={onUpdateModalClose} />
            }
            <OptionsBar btnName='Add Clinic' fn={onAddModalOpen} />
            <TableContainer display='flex' justifyContent='center' h='100%'>
                <Flex flexDirection='row' alignItems='center' >
                    <Table variant='simple'>
                        <TableCaption>Clinic List</TableCaption>
                        <Thead>
                            <Tr >
                                <Th color='blue.600'>ID</Th>
                                <Th color='blue.600'>Name</Th>
                                <Th color='blue.600'>Location</Th>
                                <Th color='blue.600'>Edit</Th>
                                <Th color='blue.600'>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {clinics.map((clinic) => (
                                <Tr key={clinic.id + clinic.name}>
                                    <Td>{clinic.id}</Td>
                                    <Td>{clinic.name}</Td>
                                    <Td>{clinic.location}</Td>
                                    <Td>
                                        <IconButton
                                            onClick={() => handleEditClick(clinic)}
                                            variant='outline'
                                            colorScheme='blue'
                                            aria-label='Search database'
                                            icon={<EditIcon />}
                                        />
                                    </Td>
                                    <Td>
                                        <IconButton
                                            onClick={() => handleDelete(clinic)}
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

export default Clincs

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/clinics`);
    const clinics = await res.json();

    return {
        props: { clinics },
        revalidate: 10
    }
}