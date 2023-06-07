import { Avatar, Box, Button, Flex, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react';
import { FcPhoneAndroid } from "react-icons/fc";
import { MdElectricRickshaw } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri"

function Card({ title, phoneNumber, vehicleNo, key, longitude, latitude }) {

    const handleWhatsapp = () => {
        const googlemap = `https://www.google.com/maps?q=${latitude},${longitude}`
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${googlemap}`
        window.open(whatsappUrl, '_blank');    }
 
    return (
        // <Box p={4} lineHeight={"10px"} bg={"teal"}>
        <Accordion allowToggle bg={'telegram.400'} key={key} borderRadius={10} m={2}>
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
                    <Flex>
                        <Box>
                            <Flex p={2}>
                                <Box mt={"3px"}>
                                    <FcPhoneAndroid size={"26px"} />
                                </Box>
                                <Text ml={4} color={"white"} fontSize={20}>{phoneNumber}</Text>
                            </Flex>
                            <Flex p={2}>
                                <Box mt={"3px"} >
                                    <MdElectricRickshaw size={"26px"} color='white' />
                                </Box>
                                <Text ml={4} color={"white"} fontSize={20}>{vehicleNo}</Text>
                            </Flex>
                        </Box>
                        <Box mt={5} ml={[32,30,30,44]}  onClick={handleWhatsapp}>
                            <RiWhatsappFill color='white' size={"50px"} />
                        </Box>
                    </Flex>

                </AccordionPanel>
            </AccordionItem>
        </Accordion>
        // </Box>
    )
}

export default Card
