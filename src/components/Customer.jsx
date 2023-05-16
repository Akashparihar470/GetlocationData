import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./map.css";
import axios from "axios"
import { Switch, SimpleGrid, Progress, Box } from '@chakra-ui/react';
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
  const Loading = useSelector(store => store.Alldata.Loaderlocation)

  // if switch is enable then it will send the request
  const handlecheck = (map, position) => {
    if (isChecked) {
      // if(!postdata?.status){
      const data = { coordinates: [position.coords.longitude, position.coords.latitude], radius: 10, type: "serviceProvider" };
      dispatch(sendgetlocation(data, user._id))


      new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);


    }
  }
  console.log(isChecked)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
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
  console.log(locations);


  return (
    <>
      <Switch onChange={handleSwitchChange} isChecked={isChecked} />
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }}></div>
      <SimpleGrid columns={[1, 2, 2, 2]} spacing={2}>
        {Loading || !isChecked ? <Progress size='xs' isIndeterminate /> :
          locations?.map(e => <Box borderRadius={2}>
            <Card title={e.fullName} phoneNumber={e.number} vehicleNo={e.vehicleNo} key={e._id} />
          </Box>
          )}
      </SimpleGrid>
    </>
  );
};

export default Customer;