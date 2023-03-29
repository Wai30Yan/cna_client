import NextLink from 'next/link'
import { Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input, DrawerFooter, Button, Link } from "@chakra-ui/react";
import NavLink from './NavLink';

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}

export default function DrawerComponent(props: Props) {

  return (
    <Drawer
        isOpen={props.isOpen}
        placement='left'
        onClose={props.onClose}
        
    >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Navigation Panel</DrawerHeader>

      <DrawerBody display='flex' flexDirection='column'>
        <NavLink href='/'> 
          <Text >
            Appointment
          </Text>
        </NavLink>
        <NavLink href='/doctors'> 
          <Text >
            Doctors
          </Text>
        </NavLink>
        <NavLink href='/clinics'> 
          <Text >
            Clinics
          </Text>
        </NavLink>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
  )
}
