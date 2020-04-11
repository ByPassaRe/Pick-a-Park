import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
 
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ2hlcml0YXJlbmllcmk5NiIsImEiOiJjazN4bzl0MXowZDd6M2xwNm5xbmZrZ2oxIn0.HAkjmhv5QblYNTnR_ZKiQg';

class Map extends React.Component {

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            minZoom: 2,
            maxZoom: 15,
            center: [-79.4512, 43.6568],
            zoom: 13,
            bearingSnap: 3,
            interactive: true
        });

        const directions = new MapboxDirections({
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
      
        map.addControl(directions, 'top-right');

        map.on('load', function () {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(position => {
                var lon = position.coords.longitude;
                var lat = position.coords.latitude;
                directions.setOrigin([lon, lat]);
              });
          
            } else {
              alert("Impossibile calcolare la tua posizione");
            }  
          });
    }

    render() {
        return (
        <div>
            <div style={{height: '600px', width: '100%'}}ref={el => this.mapContainer = el}/>
        </div>
        )
    }
}

export default Map;