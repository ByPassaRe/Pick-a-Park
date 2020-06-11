import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import axios from 'axios';
import { getDistance } from 'geolib';
import Swal from 'sweetalert2'

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg';

let eventFired = false;
let directions = null;
let map = null;
let coordinates = null;
let latitudeDest = 0;
let longitudeDest = 0;

const PROXIMITY_THRESHOLD = 20;
let parkingDestination = null;
let prenotationId = null;
let proximitySet = false;
let isEnteredOnRoute = false;

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
    Swal.fire("error retrieving parking spot");
  }
}

const checkUserFund = async () => {
  try {
    const result = await axios.get('http://localhost:5000/users/balance');
    if (result.status === 200)
      return result.data.balance > 0

    return false

  } catch (error) {
    Swal.fire("error retrieving user found");
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
        parkingDestination = [nearestParkingSpot.location.longitude, nearestParkingSpot.location.latitude];
        directions.setDestination(parkingDestination);

        eventFired = true;

        try {
          //Set parking selected not available
          const response = await axios.post('http://localhost:5000/prenotations', {
            username: localStorage.getItem("username"),
            parkingSpotId: nearestParkingSpot._id
          });

          switch (response.status) {
            case 200:
              prenotationId = response.data._id;
              console.log(prenotationId);
              break;
            case 400:
              Swal.fire("Database error")
              break;
            default:
              Swal.fire("Unexpected error");
          }
        } catch (error) {
          Swal.fire(error)
        }

        isEnteredOnRoute = true;
      });

    });
  }

  componentDidUpdate() {
    
    if(!isEnteredOnRoute)
      return
    coordinates = [this.props.longitude, this.props.latitude];
    const destination = [longitudeDest, latitudeDest];

    const start = { longitude: coordinates[0], latitude: coordinates[1] };
    const finish = { longitude: parkingDestination[0], latitude: parkingDestination[1] };
    console.log(start);
    console.log(finish);
    const distance = getDistance(start, finish);
    console.log(distance);

    if (distance < PROXIMITY_THRESHOLD && !proximitySet) {
      proximitySet = true;
      console.log('PROXIMITY TRIGGERED');
      axios.patch(`http://localhost:5000/prenotations/${prenotationId}/proximity`).then(() => console.log('Proximity'));
    };
    if (directions) {
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