import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import ReactMapGL, {GeolocateControl} from "react-map-gl";
const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};
class Map extends Component {
  state = {
    viewport: {
      width:"50vw",
      height:"50vh",
      latitude: 0,
      longitude: 0,
      zoom: 4,
    }
  }

  render() {
    const {viewport} = this.state;
    return (
      <ReactMapGL {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      //mapStyle="mapbox://styles/mapbox/streets-v11"
      //mapStyle="mapbox://styles/mapbox/light-v10"
      //mapStyle="mapbox://styles/mapbox/dark-v10"
      width="100vw"
      height="100vh"
      onViewportChange={viewport => this.setState({viewport})}>
      <GeolocateControl
         style={geolocateStyle}
         positionOptions={{enableHighAccuracy: true}}
         trackUserLocation={true}
         showUserLocation={true}
         showAccuracyCircle={true}
        />
      </ReactMapGL>
    );
  }
}
export default Map;

