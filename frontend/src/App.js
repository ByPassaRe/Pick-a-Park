import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import ReactMapGL, {GeolocateControl} from "react-map-gl";
import Geocoder from 'react-map-gl-geocoder';
import DeckGL, {GeoJsonLayer} from 'deck.gl';


const access_token = "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg";

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};
const geocoderStyle ={
  float:'left',
  margin: '100px',
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
    },
    searchResultLayer: null
  }
  mapRef= React.createRef()

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }
  render() {
    const {viewport,searchResultLayer} = this.state;
    console.log(viewport);
    return (
      <ReactMapGL 
      ref={this.mapRef}
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg"
      //mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
      //mapStyle="mapbox://styles/mapbox/light-v10"
      //mapStyle="mapbox://styles/mapbox/dark-v10"
      width="100vw"
      height="100vh"
      onViewportChange={viewport => this.setState({viewport})}>
      <GeolocateControl
         style={geolocateStyle}
         positionOptions={{enableHighAccuracy: true}}
         showUserLocation={true}
         showAccuracyCircle={true}
        />
      <Geocoder
        mapRef={this.mapRef}
        style={geocoderStyle}
        handleOnResult = {this.handleOnResult}
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={access_token}
      /> 
      
      </ReactMapGL>
    );
  }
}
export default Map;

