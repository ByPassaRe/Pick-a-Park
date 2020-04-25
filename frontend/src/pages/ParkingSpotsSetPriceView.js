
import React, { useState, useEffect } from 'react';
import axios from "../services/axiosService";

import ParkingSpotListItem from './../components/ParkingSpotListItem';

function ParkingSpotsSetPriceView() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [parkingSpots, setParkingSpots] = useState(null);

    useEffect(() => {
        (async function fetchParkingSpots () {
            setStatusMessage('Loading...');
            
            try {
                const response = await axios.get('http://localhost:5000/parkingSpots');
                setParkingSpots(response.data.parkingSpots);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };
            
        })();

    }, []);

    const renderParkingSpotWithSetPrice = (parkingSpot) => 
        <ParkingSpotListItem key={parkingSpot._id} priceSetter parkingSpot={parkingSpot}/>

    return (
        <>
        <h2>Parking Spots prices:</h2>
        { parkingSpots ? 
            parkingSpots.map( renderParkingSpotWithSetPrice ) : 
            <p>{statusMessage}</p> }
        </>
    );
}

export default ParkingSpotsSetPriceView;