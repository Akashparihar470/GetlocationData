import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "./map.css";
import axios from "axios"
import { Switch } from '@chakra-ui/react';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWthc2hzaW5naDEzIiwiYSI6ImNsaDdiMDZlaDBlaHEzcHV5ZW1qYWx6eXgifQ.3qS2Tarh3IoGolgrXboe5A';

const Customer = () => {
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [postdata,setPostdata] = useState()
  const [isChecked, setIsChecked] = useState(false);
  const [locations, setLocations] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);


// if switch is enable then it will send the request
const handlecheck = (map,position) =>{
  if(isChecked){
    if(!postdata?.status){
      const data = {longitude : position.coords.longitude, latitude : position.coords.latitude};
  
      axios.post(`http://localhost:5500/customer`,data).then(res=>setPostdata(res))
      .catch(err=>console.log(err))
      }

      axios(`http://localhost:5500/api/serviceProvider`).then(res=>setLocations(res.data))
      .catch(err=>console.log(err))
  
      new mapboxgl.Marker().setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map.current);
  }
}


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
        });

      // to check the switch
       handlecheck(map,position);
    

      });
    }else{
      alert("Geolocation is not supported by this browser.");
    }
    
  
  }, [setLat,isChecked]);

  useEffect(() => {
    // Add markers to the map for each location
    locations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'ricksawmarker';
      new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);
    });
  }, [locations]);

  function handleSwitchChange() {
    setIsChecked(!isChecked);
    // Perform any other actions you want to do when the switch is toggled
  }


  return (
    <>
     <Switch onChange={handleSwitchChange} isChecked={isChecked}/>
    <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>
   </>
  );
};

export default Customer;