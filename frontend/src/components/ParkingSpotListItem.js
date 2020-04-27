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
            console.log(err.response)
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
    
    const [confirmation, setConfirmation] = useState(false);

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
        <>
        {
            !confirmation ? <button onClick={() => setConfirmation(true)}>Delete</button> : (
                <>
                <p>Are you sure ?</p>
                <button onClick={submit}>Yes</button>
                <button onClick={() => setConfirmation(false)}>No</button>
                </>
            )
        }
        </>
    );
};

const ParkingSpotListItem = (props) => {
    const [editView, setEditView] = useState(false);
    const [parkingSpotData, setParkingSpotData] = useState(props.parkingSpot);
    const [newParkingSpotData, setNewParkingSpotData] = useState(props.parkingSpot);

    const handleChange = (e) => {
        if(e.target.name === "latitude" || e.target.name === "longitude") {
            const newLocation = {...newParkingSpotData.location}
            newLocation[e.target.name] = Number(e.target.value);
            setNewParkingSpotData({...newParkingSpotData, location: newLocation});
        }
    }

    const handleChangeSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/parkingSpots/${parkingSpotData._id}`, newParkingSpotData);
            setParkingSpotData(newParkingSpotData);
            setEditView(false);
        } catch (err) {
            alert("Error while processing request");
        }
    };
 
    return (
        <OutsetDiv>
            <p>Id: {props.parkingSpot._id}</p>
            {editView ? (
                <>
                    <p>Latitude: <input name="latitude" type="number" min="0" step="any" value={newParkingSpotData.location.latitude} onChange={handleChange}/></p>
                    <p>Longitude: <input name="longitude" type="number" min="0" step="any" value={newParkingSpotData.location.longitude} onChange={handleChange}/></p>
                    <button onClick={handleChangeSubmit}>Apply changes</button>
                </>
            ) : (
                <>
                    <p>Latitude: {parkingSpotData.location.latitude}</p>
                    <p>Longitude: {parkingSpotData.location.longitude}</p>
                </>)
            }
            {props.activator ? <Activator parkingSpot={props.parkingSpot} /> : null}
            {props.priceSetter ? <PriceSetter parkingSpot={props.parkingSpot}/>:null}
            {props.deleter ? <Deleter deleteHandler={props.deleteHandler} id={props.parkingSpot._id}>Can be Deleted</Deleter> : null}
            {props.modifier ? <button onClick={() => setEditView(!editView)}>Toggle edit mode</button>: null}
        </OutsetDiv>
    );
}

export default ParkingSpotListItem;