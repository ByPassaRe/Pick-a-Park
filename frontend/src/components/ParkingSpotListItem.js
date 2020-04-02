import React from 'react';

const ParkingSpotListItem = (props) => {
    return (
        <>
            <p>Id: {props.parkingSpot._id}</p>
            <p>Latitude: {props.parkingSpot.location.latitude}</p>
            <p>Longitude: {props.parkingSpot.location.longitude}</p>
        </>
    );
}

export default ParkingSpotListItem;