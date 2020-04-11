import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg';

let eventFired = false;
const findParkingSpot = async (lonDest,latDest) => {

  try {
    const result = await axios.get('http://localhost:5000/parkingSpots/nearest', {
      params: {
        latitude: latDest,
        longitude: lonDest
      }
    });

    const parkingSpotLocation = result.data.parkingSpot.location;
    return [parkingSpotLocation.longitude, parkingSpotLocation.latitude];

  } catch (err) {
    alert("error retrieving parking spot");
  }
}

class Map extends React.Component {
    
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            minZoom: 2,
            maxZoom: 15,
            center: [-79.4512, 43.6568],
            zoom: 13,
            bearingSnap: 3,
            interactive: true
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            container: 'directions',
            interactive: false,
            controls: {
              inputs: true,
              instructions: false,
              profileSwitcher: false
            },
            geocoder: {
              language: 'it'
            },
            placeholderOrigin: 'La tua posizione',
            placeholderDestination: 'Inserisci destinazione'
        });
      
        map.addControl(directions, 'top-right');

        map.on('load', function () {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(position => {
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
                directions.setOrigin([lon, lat]);
              });
          
            } else {
              alert("Impossibile calcolare la tua posizione");
            }  
        });

        directions.on('route', async () => {
          console.log(eventFired);
          if(eventFired === true){
            eventFired = false;
            return;
          }
          var lonDest= directions.getDestination().geometry.coordinates[0];
          var latDest= directions.getDestination().geometry.coordinates[1];
        
          directions.setDestination(await findParkingSpot(lonDest, latDest));
          eventFired = true;
        });
    }

    render() {
        return (
          <div>
              <div style={{height: '600px', width: '100%'}}ref={el => this.mapContainer = el}/>
          </div>
        )
    }
}

export default Map;