import React from 'react';
import Map from './../components/Map';

import { geolocated } from "react-geolocated";

class MapPage extends React.Component {

    render() {
        return (
            <Map latitude={43.17392} longitude={13.78686}/>
        )
    }

}

export default MapPage;