import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./map.css";
import axios from "axios"
import {
  Switch, SimpleGrid, Progress, Box, RadioGroup, useDisclosure,
  Modal,
  Stack,
  Radio,
  Flex,
  Alert,
  AlertIcon,
  FormLabel,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text, ModalFooter,
  ModalContent,
  ModalOverlay,
  Input
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendgetlocation } from '../redux/action';
import Card from './Card';
import { useNavigate } from 'react-router';
import GeocodingForm from './GeocodingForm';
import { MdLocationSearching } from "react-icons/md"
import Category from './Category';
import Allservices from './Allservices';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthc2hzaW5naDEzIiwiYSI6ImNsajZ1eTY3aTBnMngzbXFwemVoZWNqNGMifQ.9ekt8k3lSDWzaUEOC1i99g';


const Customer = () => {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false);
  const locations = useSelector(store => store.Alldata.locations);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const user = useSelector(store => store.Alldata.login)
  const dispatch = useDispatch();
  const Islogin = useSelector(store => store.Alldata.loginSuccess);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [marker, setMarker] = useState(null);
  const [value, setValue] = useState("Car");
  const [openDrawer,setOpenDrawer] = useState(true);
  const Loading = useSelector(store => store.Alldata.Loaderlocation);

  

  useEffect(() => {
    if (!Islogin) {
      navigate("/", { replace: true })
    }
    else if (navigator.geolocation) {
      if(isChecked) {
        setSelectedAddress(null)
      }
      // onopen()
      navigator.geolocation.getCurrentPosition((position) => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: selectedAddress?.center || [position.coords.longitude, position.coords.latitude],
          zoom: 11,
        });
        setLat(position.coords.latitude);
        setLng(position.coords.longitude)

        // to check the switch
        handlecheck(position);


      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }


  }, [isChecked, value, Islogin, selectedAddress]);


  // if switch is enable then it will send the request
  const handlecheck = (position) => {
    console.log(isChecked)
    if (Islogin && isChecked && position) {
      if (value !== undefined) {
        // if(!postdata?.status){
        const data = { coordinates: [position.coords.longitude, position.coords.latitude], radius: 10, type: "serviceProvider", category: value };
        dispatch(sendgetlocation(data, user._id))


        const mark = new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
        setMarker(mark)
      } else {
        <Alert status='error'>
          <AlertIcon />
          Please select Vehicle Type
        </Alert>
      }
    } else if (Islogin) {
      if (selectedAddress?.center) {
        if (value !== undefined) {
          // if(!postdata?.status){
          const data = { coordinates: selectedAddress.center, radius: 10, type: "serviceProvider", category: value };
          dispatch(sendgetlocation(data, user._id))

          if (marker) {
            marker.remove()
          }

          const mark = new mapboxgl.Marker().setLngLat(selectedAddress.center).addTo(map.current);
          setMarker(mark)
        } else {
          <Alert status='error'>
            <AlertIcon />
            Please select Vehicle Type
          </Alert>
        }
      }
    }
  }


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



  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  // const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const handleopenModal = () => {
    setIsChecked(false)
    onOpen();
  }

  const handleSubmit = () => {
    onClose()
    if (selectedAddress.center) {
      handlecheck()
    }
  }

  const handleDrawerOpen = () =>{
    setOpenDrawer(true);
  }

  const handlevalues = (e) => {
    setValue(e)
  }
  console.log(Loading,selectedAddress)
  return (
    <>
      <SimpleGrid columns={[2, null, 3, 3]} p={2} position={"relative"} zIndex={1} w={"370px"} h={"70px"}  >
        <Box>
          <FormLabel fontSize={14} fontWeight={700} color={"#0B86C2"}>Current Location:</FormLabel>
          <Switch onChange={handleSwitchChange} isChecked={isChecked} />
        </Box>
        <Button mt={2} fontSize={16} fontWeight={700} leftIcon={<MdLocationSearching />} colorScheme='telegram' variant={'outline'} borderRadius={4} onClick={handleopenModal}>
          {selectedAddress?.text ? selectedAddress.text : "Custom Location"}
        </Button>
      </SimpleGrid>
      <Category openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} handlevalues={handlevalues}/>
      <Box p={2} position={"absolute"} top={"80px"} right={"10px"} zIndex={1} borderRadius={"25px"} bgColor={"telegram.200"} onClick={handleDrawerOpen} ><img width={"30px"} src='ricksaw.png'/></Box>
      <div ref={mapContainer} style={{ width: '100%', height: '800px' }}></div>
      {Loading || !isChecked && !selectedAddress?.text  ? <Progress size='xs' width={["500px", "700px", "2000px"]} isIndeterminate /> :
       <Allservices lng={lng} lat={lat}/> }
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {<OverlayOne/>}
        <ModalContent>
          <ModalHeader color={"gray"}>Search Adress</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GeocodingForm setSelectedAddress={setSelectedAddress} />
          </ModalBody>
          <ModalFooter >
            <Button colorScheme='telegram' variant={"solid"} borderRadius={18} onClick={handleSubmit}>
              Mark as current
            </Button>
            <Button ml={2} colorScheme='telegram' variant={"outline"} onClick={onClose} borderRadius={18}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     
      {isChecked && value === undefined ? <Alert status='error'>
        <AlertIcon />
        Please select Vehicle Type
      </Alert> : null}
    </>
  );
};

export default Customer;



