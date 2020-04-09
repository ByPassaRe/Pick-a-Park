import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const PriceSetter = (props) => {
    const [price, setPrice] = useState(props.parkingSpot.price);
    const [newPrice, setNewPrice] = useState(props.parkingSpot.price);

    const handleSend = async () => {
        try {
            await axios.patch(`http://localhost:5000/parkingSpots/${props.parkingSpot._id}`, {
                price: newPrice
            });
        } catch (err) {
            alert(err);
        }

        alert("New price set succesfully");
        setPrice(newPrice);

    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if(e.target.value < 0) {
            alert("Price can't be negative!")
            setNewPrice(price);
            return;
        }
        setNewPrice(e.target.value);
    }

    return (
    <>
        <p>Price: {props.parkingSpot.price}</p>
        Set new price: <input type="number" min="0" step="any" value={newPrice} onChange={handleChange}/> <button onClick={handleSend}>Update</button>
        <p>null</p>
    </>
    )
}

const ParkingSpotListItem = (props) => {
    return (
        <OutsetDiv>
            <p>Id: {props.parkingSpot._id}</p>
            <p>Latitude: {props.parkingSpot.location.latitude}</p>
            <p>Longitude: {props.parkingSpot.location.longitude}</p>
            {props.priceSetter ? <PriceSetter parkingSpot={props.parkingSpot}/>:null}
        </OutsetDiv>
    );
}

export default ParkingSpotListItem;