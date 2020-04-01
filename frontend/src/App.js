import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import ReactMapGL, {GeolocateControl,Marker} from "react-map-gl";
import Geocoder from 'react-map-gl-geocoder';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
const access_token = "pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg";

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '10px',
  padding: '10px',
  
};
const geocoderStyle ={
  position: 'absolute',
  top: 36,
  right: 0,
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
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };
 
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
    const {viewport, searchResultLayer} = this.state;
    return (
      <div style={{ height: '100vh'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Inserisci una destinatione italiana</h1>
      <ReactMapGL 
      ref={this.mapRef}
      {...viewport}
      mapboxApiAccessToken={access_token}
      //mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapStyle={'mapbox://styles/mapbox/streets-v11'}
      //mapStyle="mapbox://styles/mapbox/light-v10"
      //mapStyle="mapbox://styles/mapbox/dark-v10"
      width="90vw"
      height="60vh"
      onViewportChange={this.handleViewportChange}>
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
        onViewportChange={this.handleGeocoderViewportChange}
        mapboxApiAccessToken={access_token}  
        //filtro destinazione 
        filter={result => result.place_name.toLowerCase().includes("italia")} 
      /> 
     </ReactMapGL>
     
     
    </div>
    );
  }
}
export default Map;
