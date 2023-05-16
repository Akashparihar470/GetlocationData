import { Avatar, Box, Button, Flex, Heading, Text,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon } from '@chakra-ui/react'
import React from 'react';
import {FcPhoneAndroid} from "react-icons/fc";
import {MdElectricRickshaw} from "react-icons/md"

function Card({title,phoneNumber,vehicleNo,key}) {
    return (
        // <Box p={4} lineHeight={"10px"} bg={"teal"}>
            <Accordion allowToggle bg={'teal.400'} key={key} borderRadius={10} m={2}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Avatar />
                            <Box ml={6} as="span" flex='1' textAlign='left' color={"white"} fontWeight={600} fontSize={26}>
                                {title}
                            </Box>
                            {/* <AccordionIcon /> */}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Flex p={2}>
                            <Box mt={"3px"}>
                              <FcPhoneAndroid  size={"26px"} />
                            </Box>
                          <Text ml={4} color={"white"} fontSize={20}>{phoneNumber}</Text>
                        </Flex>
                        <Flex p={2}>
                            <Box mt={"3px"}>
                              <MdElectricRickshaw  size={"26px"} />
                            </Box>
                          <Text ml={4} color={"white"} fontSize={20}>{vehicleNo}</Text>
                        </Flex>
                       
                    </AccordionPanel>
                </AccordionItem>
                </Accordion>
        // </Box>
    )
}

export default Card
