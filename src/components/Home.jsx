import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react';
import btcImage from '../assets/btc.png';

const Home = () => {
    return (
        <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"} >
            <Image w={"full"} h={"full"} objectFit={"contain"} src={btcImage}></Image>
            <Text
                fontSize={"6xl"}
                textAlign={"center"}
                fontWeight={"thin"}
                color={"whiteAlpha.700"}
                mt={"-20"}
            >My Crypto App </Text>
        </Box>
    )
}

export default Home