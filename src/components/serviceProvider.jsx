import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./map.css";
import axios from "axios"
import { Switch, Progress,FormLabel, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { sendgetlocation } from '../redux/action';
import Card from './Card';
import { useNavigate } from 'react-router';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthc2hzaW5naDEzIiwiYSI6ImNsajZ1eTY3aTBnMngzbXFwemVoZWNqNGMifQ.9ekt8k3lSDWzaUEOC1i99g';

const ServiceProvider = () => {
  const [isChecked, setIsChecked] = useState(false);
  const locations = useSelector(store => store.Alldata.locations);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const user = useSelector(store => store.Alldata.login);
  const dispatch = useDispatch();
  const Loading = useSelector(store => store.Alldata.isLoading);
  const navigate = useNavigate();
  const Islogin = useSelector(store => store.Alldata.loginSuccess)

  // if switch is enable then it will send the request
  const handlecheck = (map, position) => {
    if (isChecked) {

      const data = { coordinates: [position.coords.longitude, position.coords.latitude], radius: 5, type: "customer" };
      dispatch(sendgetlocation(data, user._id))

      new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
    }
  }
  console.log(locations)
  useEffect(() => {
    if (!Islogin) {
      navigate("/", { replace: true })
    }
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 11,
        });

        // to check the switch
        handlecheck(map, position);


      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }


  }, [isChecked]);

  useEffect(() => {
    // Add markers to the map for each location


    locations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map.current);
    });
  }, [locations]);

  function handleSwitchChange() {
    setIsChecked(!isChecked);
    // Perform any other actions you want to do when the switch is toggled
  }


  return (
    <>
     <Flex p={2} justifyContent={"space-between"}>
          <FormLabel fontSize={14} fontWeight={700} color={"#0B86C2"}>Current Location:</FormLabel>
          <Switch onChange={handleSwitchChange} isChecked={isChecked} />
      </Flex>
      {Loading &&
        <Progress size='xs' isIndeterminate />}
      <div ref={mapContainer} style={{ width: '100%', height: '830px' }}></div>
      {/* <Card/> */}
    </>
  );
};

export default ServiceProvider;
