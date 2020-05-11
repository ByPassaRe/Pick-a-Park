import React, {useState} from 'react';
import styled from 'styled-components';
import axios from './../services/axiosService';
//import axios from 'axios';
import { Input, Button } from 'antd';
import '../App.css';

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
        Set new price: <Input type="number" min={0} value={newPrice} onChange={handleChange}/> 
        <Button onClick={handleSend}>Update</Button>
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
            {activated ? null: <Button onClick={handleActivate}>Make Available</Button>}
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
            !confirmation ? <Button onClick={() => setConfirmation(true)}>Delete</Button> : (
                <>
                <p>Are you sure ?</p>
                <Button onClick={submit}>Yes</Button>
                <Button onClick={() => setConfirmation(false)}>No</Button>
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
    const [confirmation, setConfirmation] = useState(false);

    const handleChange = (e) => {
        if(e.target.name === "latitude" || e.target.name === "longitude") {
            const newLocation = {...newParkingSpotData.location}
            newLocation[e.target.name] = e.target.value;
            setNewParkingSpotData({...newParkingSpotData, location: newLocation});
        }
    }

    const handleChangeSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/parkingSpots/${parkingSpotData._id}`, newParkingSpotData);
            setParkingSpotData(newParkingSpotData);
            setEditView(false);
        } catch (err) {
            alert("Invalid input data");
        }
    };
 
    return (
        <OutsetDiv>
            <p>Id: {props.parkingSpot._id}</p>
            {editView ? (
                <>
                    <p>Latitude: <Input name="latitude" type="number" min="0" step="any" value={newParkingSpotData.location.latitude} onChange={handleChange}/></p>
                    <p>Longitude: <Input name="longitude" type="number" min="0" step="any" value={newParkingSpotData.location.longitude} onChange={handleChange}/></p>
                    {
                        !confirmation ? <Button onClick={() => setConfirmation(true)}>Apply changes</Button> : (
                            <>
                            <p>Are you sure ?</p>
                            <Button onClick={handleChangeSubmit}>Yes</Button>
                            <Button onClick={() => setConfirmation(false)}>No</Button>
                            </>
                        )
                    }
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
            {props.modifier ? <Button onClick={() => setEditView(!editView)}>Toggle edit mode</Button>: null}
        </OutsetDiv>
    );
}

export default ParkingSpotListItem;