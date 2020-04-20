import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const ActivatedStatus = styled.p`
    color: ${props => props.activated ? "green" : "red"};
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
        <p>Price: {price}</p>
        Set new price: <input type="number" min="0" step="any" value={newPrice} onChange={handleChange}/> <button onClick={handleSend}>Update</button>
    </>
    )
}

const Activator = (props) => {
    const [activated, setActivated] = useState(props.parkingSpot.activated);
    
    const handleActivate = async () => {
        try {
            await axios.patch(`http://localhost:5000/parkingSpots/${props.parkingSpot._id}/activate`);
            setActivated(true);
        } catch (err) {
            alert(err)
        }
    };

    return (
        <>
            <ActivatedStatus activated={activated}>Activated: {activated.toString()}</ActivatedStatus>
            {activated ? null: <button onClick={handleActivate}>Make Available</button>}
        </>
    );
}

const Deleter = (props) => {
    
    const submit = async () => {
        try {
            await axios.delete(`http://localhost:5000/parkingSpots/${props.id}`)
        } catch (err) {
            alert('Error while processing delete request');
            return;
        }

        props.deleteHandler(props.id);
    }

    return (
        <button onClick={submit}>Delete</button>
    );
};

const ParkingSpotListItem = (props) => {
    return (
        <OutsetDiv>
            <p>Id: {props.parkingSpot._id}</p>
            <p>Latitude: {props.parkingSpot.location.latitude}</p>
            <p>Longitude: {props.parkingSpot.location.longitude}</p>
            {props.activator ? <Activator parkingSpot={props.parkingSpot} /> : null}
            {props.priceSetter ? <PriceSetter parkingSpot={props.parkingSpot}/>:null}
            {props.deleter ? <Deleter deleteHandler={props.deleteHandler} id={props.parkingSpot._id}>Can be Deleted</Deleter> : null}
        </OutsetDiv>
    );
}

export default ParkingSpotListItem;