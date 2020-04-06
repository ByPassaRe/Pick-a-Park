import React from 'react';
import styled from 'styled-components';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const ParkingSpotListItem = (props) => {
    return (
        <OutsetDiv>
            <p>Id: {props.parkingSpot._id}</p>
            <p>Latitude: {props.parkingSpot.location.latitude}</p>
            <p>Longitude: {props.parkingSpot.location.longitude}</p>
        </OutsetDiv>
    );
}

export default ParkingSpotListItem;