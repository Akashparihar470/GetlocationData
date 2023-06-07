import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SimpleGrid, Box, Progress } from '@chakra-ui/react';
import Card from './Card';

function Allservices({lng,lat}) {
    const locations = useSelector(store => store.Alldata.locations);
  
  return (
    <Box w={"100%"} position={"absolute"} bottom={"0px"} zIndex={1} borderTopRadius={"15px"} bgColor={'white'}>
        <SimpleGrid columns={[1, 2, 2, 4]} spacing={2}>
        {locations?.map(e => <Box borderRadius={2}>
            <Card title={e.fullName} phoneNumber={e.number} vehicleNo={e.vehicleNo} key={e._id} longitude={lng} latitude={lat} />
          </Box>
          )}
      </SimpleGrid>
    </Box>
  )
}

export default Allservices;