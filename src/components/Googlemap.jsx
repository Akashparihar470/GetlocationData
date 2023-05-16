import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { position } from '@chakra-ui/react';

const googleMapsLoader = new Loader({
    apiKey: 'AIzaSyDxiFR2nEx0GwOtgqJR0ncyUwNenVpJ58Y',
    version: 'weekly',
  });

function Googlemap() {

    useEffect(() => {
        if(navigator.geolocation){
              navigator.geolocation.getCurrentPosition((position) => {
                googleMapsLoader.load().then((google) => {
                    const map = new google.maps.Map(document.getElementById('map'), {
                      center: { lat: position.coords.latitude, lng: position.coords.longitude }, // Default center (San Francisco)
                      zoom: 10, // Default zoom level
                    });
                    
                    console.log(position.coords)
                    // Add marker
                    new google.maps.Marker({
                      position: {  lat: position.coords.latitude, lng: position.coords.longitude },
                      map: map,
                    });
                  });
              })
        }
        
      }, []);
    
      return <div id="map" style={{ width: '100%', height: '400px' }} />;
  
}

export default Googlemap
