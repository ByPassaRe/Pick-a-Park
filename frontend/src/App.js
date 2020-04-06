import "mapbox-gl/dist/mapbox-gl.css";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.
import React, { Component } from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import mapboxgl, {GeolocateControl} from 'mapbox-gl';
//import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

mapboxgl.accessToken= "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg";
const Map = ReactMapboxGl({
  container:'map',
  accessToken: "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg",
  minZoom:4,
  maxZoom:15,
  interactive: true,
  bearingSnap: 3
});
const mapStyle = {
  flex: 1,
  height: '90vh',
  width: '80vw'
};
var directions = new MapboxDirections({accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: 'mapbox/driving',
  interactive: true,
	controls: {
    inputs: true,
    instructions:false,
		profileSwitcher: false
  },
  geocoder: {
		language: 'it'
  },
  placeholderOrigin: 'Inserisci origine',
  placeholderDestination: 'Inserisci destinazione'
  });
const onMapLoad = (map) =>{
  map.addControl(
    new GeolocateControl({
      positionOptions:{
        enableHighAccurancy: true
      },
      trackUserLocation: true
        }),
  'top-left');
  map.addControl(new mapboxgl.FullscreenControl(),'top-left');
  map.addControl(new mapboxgl.NavigationControl(),'top-left');
 // map.addControl(new MapboxGeocoder({accessToken:mapboxgl.accessToken, mapboxgl: mapboxgl }), 'top-right');
  map.addControl(directions, 'top-right');
 };
 if ("geolocation" in navigator) { 
  navigator.geolocation.getCurrentPosition(position => { 
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
      var map = new mapboxgl.Map({
        container: 'root',
       // initial position in [lon, lat] format
        center: [lon, lat]
      });
      directions.setOrigin([lon,lat]);
  }); 
} else { /* geolocation IS NOT available, handle it */ }
class MapPage extends Component {  
  render() {
    return (
  <Map 
  style="mapbox://styles/mapbox/streets-v11"
  containerStyle={mapStyle}
  onStyleLoad={onMapLoad}
  >
  </Map>
  )}
}
  export default MapPage; 

