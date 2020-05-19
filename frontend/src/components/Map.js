import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg';

let eventFired = false;
let directions = null;
let map = null;
let coordinates = null;
let latitudeDest = 0;
let longitudeDest = 0;


const findParkingSpot = async (lonDest, latDest) => {
  try {
    const result = await axios.get('http://localhost:5000/parkingSpots/nearest', {
      params: {
        latitude: latDest,
        longitude: lonDest
      }
    });

    return result.data.parkingSpot;

  } catch (err) {
    alert("error retrieving parking spot");
  }
}

const checkUserFund = async() => {
  try {
    const result = await axios.get('http://localhost:5000/users/balance');
    if(result.status === 200)
      return result.data.balance > 0

    return false

  } catch (error) {
    alert("error retrieving user found");
  }
};

class Map extends React.Component {

  componentDidMount() {

    coordinates = [this.props.longitude, this.props.latitude];
    directions = null

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 13
    });

    map.on('load', async function () {
      directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: {
          inputs: await checkUserFund(),
          instructions: false,
          profileSwitcher: false,
        },
        placeholderOrigin: 'Loading your position....',
        interactive: false
      });

      map.addControl(directions, 'top-right');
      directions.setOrigin(coordinates)
      map.setCenter(coordinates)
      map.setZoom(16);


      directions.on('route', async () => {
      
        if (eventFired === true) {
          //eventFired = false;
          return;
        }
  
        //Set new destination
        longitudeDest = directions.getDestination().geometry.coordinates[0];
        latitudeDest = directions.getDestination().geometry.coordinates[1];
        var nearestParkingSpot = await findParkingSpot(longitudeDest, latitudeDest);
        directions.setDestination([nearestParkingSpot.location.longitude,nearestParkingSpot.location.latitude]);


        eventFired = true;    

        try {
          //Set parking selected not available
          const response = await axios.post('http://localhost:5000/prenotations', {
            username: localStorage.getItem("username"),
            parkingSpotId: nearestParkingSpot._id
          }); 

          switch (response.status) {
            case 200:
              break;
            case 400:
              alert("Database error")
              break;
            default:
              alert("Unexpected error");
          }
        } catch (error) {
          alert(error)
        }
        
      });  
      
    });
  }

  componentDidUpdate(){
    coordinates = [this.props.longitude,this.props.latitude];
    if(directions){
      directions.setOrigin(coordinates)
      map.setCenter(coordinates)
      map.setZoom(15)
    }
  }

  render() {
    return (
      <div>
        <div style={{ height: '600px', width: '100%' }} ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

export default Map;