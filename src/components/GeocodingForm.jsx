import { Box, Button, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { useState } from 'react';
import { GrLocation } from "react-icons/gr";
import { RiBookmark3Fill } from "react-icons/ri"

const geocodingClient = MapboxGeocoding({ accessToken: "pk.eyJ1IjoiYWthc2hzaW5naDEzIiwiYSI6ImNsaDdiMDZlaDBlaHEzcHV5ZW1qYWx6eXgifQ.3qS2Tarh3IoGolgrXboe5A" });

const GeocodingForm = ({ setSelectedAddress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [savedAddress, setSavedAddress] = useState([])

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedAddress(null);
    if (e.target.value) {
      geocodingClient
        .forwardGeocode({
          query: e.target.value,
          countries: ['in'], // Specify the country code if needed
          limit: 5, // Limit the number of suggested addresses
        })
        .send()
        .then((response) => {
          setSuggestedAddresses(response.body.features);
        });
    } else {
      setSuggestedAddresses([]);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSearchQuery(address.place_name);
    console.log(address);
  };


  const handleSaved = (e) => {
    setSavedAddress((prev) => [...prev, e])
  }

  console.log(savedAddress)

  return (
    <Box>
      <FormControl >

        <Input
          variant={"outline"}
          colorScheme='teal'
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter an address"
        />
        {/* <Button type="submit" colorScheme='teal' variant={"solid"}>Search</Button> */}
      </FormControl>

      <Box borderBottom={"1px solid grey"} >
        {suggestedAddresses.length > 0 && (
          <ul>
            {suggestedAddresses.map((address) => (
              // <li key={address.id} onClick={() => handleAddressSelect(address)}>
              //   {address.place_name}
              // </li>
              <Card bookmark={true} selected={() => handleAddressSelect(address)} id={address.id} title={address.place_name} handlesaved={() => handleSaved(address)} />
            ))}
          </ul>
        )}
      </Box>

      <Heading fontSize={20} m={2} mt={4} color={"gray"}>Saved Address</Heading>
      {savedAddress.length > 0 && (
        <ul>
          {savedAddress.map((address) => (
            // <li key={address.id} onClick={() => handleAddressSelect(address)}>
            //   {address.place_name}
            // </li>
            <Card selected={() => handleAddressSelect(address)} id={address.id} title={address.place_name} />
          ))}
        </ul>
      )}
    </Box>
  );
};

export default GeocodingForm;



function Card({ selected, title, id, handlesaved, bookmark }) {

  return (
    <Flex p={2} key={id} w={"100%"}>
      <Box p={2}>
        <GrLocation size={22} />
      </Box>
      <Box onClick={selected} p={2}>
        <Text >{title}</Text>
      </Box>
      {bookmark ? <Box p={2} ml={"auto"} mr={0} onClick={handlesaved}><RiBookmark3Fill size={22} /></Box>
        : null}
    </Flex>
  )
}
