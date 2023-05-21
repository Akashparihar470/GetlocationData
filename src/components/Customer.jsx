import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./map.css";
import axios from "axios"
import { Switch, SimpleGrid, Progress, Box, RadioGroup, Stack, Radio, Flex,Alert,AlertIcon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendgetlocation } from '../redux/action';
import Card from './Card';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthc2hzaW5naDEzIiwiYSI6ImNsaDdiMDZlaDBlaHEzcHV5ZW1qYWx6eXgifQ.3qS2Tarh3IoGolgrXboe5A';

const Customer = () => {
  const [isChecked, setIsChecked] = useState(false);
  const locations = useSelector(store => store.Alldata.locations);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const user = useSelector(store => store.Alldata.login)
  const dispatch = useDispatch();
  const Loading = useSelector(store => store.Alldata.Loaderlocation);
  const Islogin = useSelector(store => store.Alldata.loginSuccess);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [value, setValue] = useState("Car")

  // if switch is enable then it will send the request
  const handlecheck = (map, position) => {
    if (isChecked && Islogin ) {
      if (value !== undefined) {
        // if(!postdata?.status){
        const data = { coordinates: [position.coords.longitude, position.coords.latitude], radius: 10, type: "serviceProvider", category: value };
        dispatch(sendgetlocation(data, user._id))


        new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
      }else{
        <Alert status='error'>
        <AlertIcon />
        Please select Vehicle Type
         </Alert>
      }



    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
        });
        setLat(position.coords.latitude);
        setLng(position.coords.longitude)

        // to check the switch
        handlecheck(map, position);


      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }


  }, [isChecked,value]);

  useEffect(() => {
    // Add markers to the map for each location
    locations?.forEach((e) => {
      const el = document.createElement('div');
      el.className = 'ricksawmarker';
      new mapboxgl.Marker(el)
        .setLngLat(e.coordinates)
        .addTo(map.current);
    });
  }, [locations]);

  function handleSwitchChange() {
    setIsChecked(!isChecked);
    // Perform any other actions you want to do when the switch is toggled
  }
  


  return (
    <>
      <Flex>
        <Switch onChange={handleSwitchChange} isChecked={isChecked} m={2} />
        <RadioGroup onChange={setValue} value={value} ml={6}>
          <Stack direction='row' p={"4px"}>
            <Radio value='Car'>Car</Radio>
            <Radio value='Ricksaw'>Ricksaw</Radio>
            <Radio value='Tempo'>Tempo</Radio>
            <Radio value='Truck'>Truck</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }}></div>
      <SimpleGrid columns={[1, 2, 2, 4]} spacing={2}>
        {Loading || !isChecked ? <Progress size='xs' width={"100%"} isIndeterminate /> :
          locations?.map(e => <Box borderRadius={2}>
            <Card title={e.fullName} phoneNumber={e.number} vehicleNo={e.vehicleNo} key={e._id} longitude={lng} latitude={lat} />
          </Box>
          )}
      </SimpleGrid>
      {isChecked && value === undefined ? <Alert status='error'>
        <AlertIcon />
        Please select Vehicle Type
         </Alert>:null}
    </>
  );
};

export default Customer;