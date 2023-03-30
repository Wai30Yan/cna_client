import Header from '@/components/Header'
import { ChakraProvider } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <ChakraProvider>
      <Html lang="en">
        <Head />
        <body>
          <Header />
          <Main />
          <NextScript />
        </body>
      </Html>
    </ChakraProvider>
  )
}
