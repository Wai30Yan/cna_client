import { Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link"

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void
}

export default function DrawerComponent(props: Props) {
  const router = useRouter();

  // const isActive = router.pathname === props.href;
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
          <Link href='/'>
            Appointment
          </Link>
          <Link href='/doctors'>
            Doctors
          </Link>
          <Link href='/clinics'>
            Clinics
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
