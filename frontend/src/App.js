import "mapbox-gl/dist/mapbox-gl.css"
import React, { Component } from 'react'
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import {GeolocateControl} from 'mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg",
  minZoom:4,
  maxZoom:15,
  interactive: true,
  refreshExpiredTiles: true
});
const jumpToOptions ={
  center: [0,0],
  zoom:9,
  speed:0.8,
  curve:1
}

const mapStyle = {
  flex: 1,
  height: '90vh',
  width: '60vw'
};
const onMapLoad = (map) =>{
  map.addControl(
    new GeolocateControl({
      positionOptions:{
        enableHighAccurancy: true
      },
      trackUserLocation: true
    })
  );
};
class MapPage extends Component {  
  
  render() {
    return (
  <Map 
  style="mapbox://styles/mapbox/streets-v11"
  containerStyle={mapStyle}
  jumpToOptions={jumpToOptions}
  onStyleLoad={onMapLoad}
  >

  </Map>


  )}
}
  export default MapPage; 
