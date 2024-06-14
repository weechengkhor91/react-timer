import React from 'react';
import { Box } from "@chakra-ui/react";


type BoxWrapperProps = {
    children: React.ReactNode
}
const BoxWrapper = ({children}: BoxWrapperProps) => {
    return (
        <>
          <Box borderRadius={["40px", "40px", "80px"]}  height={["400px","400px","450px"]} maxWidth={["100%","100%","600px"]} background="pink.200" boxShadow="2px 5px 30px 0px rgba(0, 0, 0, 0.25)" >
            {children}
          </Box>
        </>
    )
}

export default BoxWrapper;