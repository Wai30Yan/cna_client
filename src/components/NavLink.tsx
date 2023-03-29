import { useRouter } from 'next/router';
import React from 'react'
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
}

function NavLink(props: Props) {
  const router = useRouter();
  const isActive = router.pathname === props.href;

  return (
    <NextLink href={props.href}>
      <ChakraLink
        py={2}
        px={4}
        fontWeight={isActive ? 'bold' : 'normal'}
        color={isActive ? 'blue.500' : 'gray.500'}
        _hover={{ textDecoration: 'none', color: 'blue.500' }}
      >
        {props.children}
      </ChakraLink>
    </NextLink>
  );
}

export default NavLink