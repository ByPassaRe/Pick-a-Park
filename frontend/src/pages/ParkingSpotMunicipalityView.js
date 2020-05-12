import React, { useState, useEffect } from 'react';
import axios from "../services/axiosService";

import ParkingSpotListItem from '../components/ParkingSpotListItem';

function ParkingSpotMunicipalityView() {
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

    const onDelete = (id) => {
        setParkingSpots(parkingSpots.filter(parkingSpot => parkingSpot._id !== id));
    };

    const renderParkingSpot = (parkingSpot) => <ParkingSpotListItem key={parkingSpot._id} parkingSpot={parkingSpot} modifier activator deleter deleteHandler={onDelete}/>

    return (
        <>
        <h2>Parking Spots:</h2>
        { parkingSpots ? 
            parkingSpots.map( renderParkingSpot ) : 
            <p>{statusMessage}</p> }
        </>
    );
}

export default ParkingSpotMunicipalityView;