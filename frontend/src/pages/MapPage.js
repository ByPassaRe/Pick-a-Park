import React from 'react';
import Map from './../components/Map';

import { geolocated } from "react-geolocated";

class MapPage extends React.Component {

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <Map latitude={this.props.coords.latitude} longitude={this.props.coords.longitude}/>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
    
}

export default geolocated({watchPosition: true})(MapPage);