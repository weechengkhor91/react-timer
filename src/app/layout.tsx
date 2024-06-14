'use client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from './theme';

type MyProps = {
  children: React.ReactNode
}



export default function RootLayout({
  children
}: MyProps) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>  
      </body>
    </html>
  );
}
