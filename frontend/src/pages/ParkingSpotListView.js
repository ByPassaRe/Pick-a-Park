import React, { useState, useEffect } from 'react';

const dummyData = [{
    location: {
        "latitude": 50,
        "longitude": 50
    },
    available: false,
    _id: "5e85e7525f8ad935210d2602",
    __v: 0
},
{
    location: {
        latitude: 30,
        longitude: 20
    },
    available: false,
    _id: "5e85e7595f8ad935210d2603",
    __v: 0
}];

function ParkingSpotListView() {
    const [statusMessage, setStatusMessage] = useState('Loading...');
    const [parkingSpots, setParkingSpots] = useState(null);

    useEffect(() => {

        (async function fetchParkingSpots () {
            setStatusMessage('Loading');
            setParkingSpots(dummyData);
            console.log(parkingSpots);
        })();

    }, [parkingSpots]);

    return (
        <>
        <p>parkingSpot</p>
        { parkingSpots ? 
            parkingSpots.map((parkingSpot) => <p key={parkingSpot._id}>ParkingSpot List</p>) : 
            <p>{statusMessage}</p> }
        </>
    );
}

export default ParkingSpotListView;