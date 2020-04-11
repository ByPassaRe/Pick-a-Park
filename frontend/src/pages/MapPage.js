import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import React from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import mapboxgl, { GeolocateControl } from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg";

const Map = ReactMapboxGl({
  container: 'map',
  accessToken: "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg",
  minZoom: 2,
  maxZoom: 15,
  interactive: true,
  bearingSnap: 3
});
const mapStyle = {
  flex: 1,
  height: '90vh',
  width: '80vw'
};
var directions = new MapboxDirections({
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
/**
var geocoder = new MapboxGeocoder(
  {accessToken:mapboxgl.accessToken, mapboxgl: mapboxgl }
);
*/
function findParkingSpot(lonDest,latDest){
  var lonPark = 23;
  var latPark = 40.7;
  return [lonPark,latPark];
}
const onMapLoad = (map) => {
  map.addControl(
    new GeolocateControl({
      positionOptions: {
        enableHighAccurancy: true
      },
      trackUserLocation: true
    }),
    'top-left');
  //map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
  map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  //map.addControl(geocoder, 'top-right');
  map.addControl(directions, 'top-right');
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      directions.setOrigin([lon, lat]);
    });

  } else {
    alert("Impossibile calcolare la tua posizione");
  }
  var eventFired = false;
  directions.on('route', function () {
    //se l'evento si è verificato esco 
    // if eventFired then exit
    if(eventFired === true){
      eventFired = false;
      return;
    }
    var lonDest= directions.getDestination().geometry.coordinates[0];
    var latDest= directions.getDestination().geometry.coordinates[1];
     console.log(findParkingSpot(lonDest,latDest));
    directions.setDestination(findParkingSpot(lonDest,latDest));
    eventFired = true;

  })
};

const MapPage = () => {
    return (
        <Map
        // eslint-disable-next-line
        style={"mapbox://styles/mapbox/streets-v11"}
        containerStyle={mapStyle}
        onStyleLoad={onMapLoad}
      />
    );
}

export default MapPage;