import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

const theme = extendTheme({
  styles: {
    global: {
      html: {
        margin: 0,
        padding: 0,
      },
      body: {
        maxwidth: '1920px',
        height: '100vh',
        margin: 0,
        padding: 0,
        // background: 'blue',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
