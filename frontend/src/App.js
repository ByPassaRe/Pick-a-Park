import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from 'react';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import mapboxgl, {GeolocateControl, Directions} from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
 


mapboxgl.accessToken= "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg";
const Map = ReactMapboxGl({
  container:'map',
  accessToken: "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg",
  minZoom:4,
  maxZoom:15,
  interactive: true,
  bearingSnap: 3
});
const flyToOptions ={
  center: [0,0],
  zoom:9,
  speed:0.8,
  curve:1
}

const mapStyle = {
  flex: 1,
  height: '90vh',
  width: '80vw'
};
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
  map.addControl(new MapboxGeocoder({accessToken:mapboxgl.accessToken, mapboxgl: mapboxgl }), 'top-right');
 };
class MapPage extends Component {  
  
  render() {
    return (
  <Map 
  style="mapbox://styles/mapbox/streets-v11"
  containerStyle={mapStyle}
  flyToOption={flyToOptions} 
  onStyleLoad={onMapLoad}
  >
  </Map>


  )}
}
  export default MapPage; 
