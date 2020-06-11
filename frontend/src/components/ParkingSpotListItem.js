import React, { useState } from 'react';
import styled from 'styled-components';
import axios from './../services/axiosService';
//import axios from 'axios';
import { Input, Button, Form } from 'antd';
import Swal from 'sweetalert2'

import '../App.css';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 45px;
    box-shadow: 10px 10px 5px #dce8ea;

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
            Swal.fire(err);
        }

        Swal.fire("New price set succesfully");
        setPrice(newPrice);

    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value < 0) {
            Swal.fire("Price can't be negative!")
            setNewPrice(price);
            return;
        }
        setNewPrice(e.target.value);
    }

    return (
        <>
            <Form.Item
                label="Price:"
                name="price">
                <strong> {price}</strong>
            </Form.Item>
            <Form.Item
                label="Set new price:"
                name="newPrice">
                <Input type="number" style={{ verticalAlign: 'middle', width: 65 }} min={0} value={newPrice} onChange={handleChange} />
            </Form.Item>

            <Form.Item>
                <Button className="button" type="primary" onClick={handleSend}>Update</Button>
            </Form.Item>
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
            Swal.fire(err)
        }
    };

    return (
        <>
            <strong><ActivatedStatus activated={activated}>Activated: {activated.toString()}</ActivatedStatus></strong>
            {activated ? null : <Button type="primary" onClick={handleActivate}>Make Available</Button>}

        </>
    );
}

const Deleter = (props) => {

    const [confirmation, setConfirmation] = useState(false);

    const submit = async () => {
        try {
            await axios.delete(`http://localhost:5000/parkingSpots/${props.id}`)
        } catch (err) {
            Swal.fire('Error while processing delete request');
            return;
        }

        props.deleteHandler(props.id);
    }

    return (
        <>
            {
                !confirmation ? <Button type="primary" danger onClick={() => setConfirmation(true)}>Delete</Button> : (
                    <>
                        <p><strong>Are you sure ?</strong></p>
                        <Button type="default" success onClick={submit}>Yes</Button>
                        &nbsp;
                        <Button type="primary" danger onClick={() => setConfirmation(false)}>No</Button>
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
        if (e.target.name === "latitude" || e.target.name === "longitude") {
            const newLocation = { ...newParkingSpotData.location }
            newLocation[e.target.name] = e.target.value;
            setNewParkingSpotData({ ...newParkingSpotData, location: newLocation });
        }
    }

    const handleChangeSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/parkingSpots/${parkingSpotData._id}`, newParkingSpotData);
            setParkingSpotData(newParkingSpotData);
            setEditView(false);
        } catch (err) {
            Swal.fire("Invalid input data");
        }
    };

    return (
        <OutsetDiv>
            <div className="form-container">
                <Form
                    name="parkingSpot"
                    className="parkingSpot-form">
                    <Form.Item
                        label="Id:"
                        name="id"
                    ><strong>{props.parkingSpot._id}</strong>
                    </Form.Item>
                    {editView ? (
                        <> <Form.Item
                            label="Latitude:"
                            name="latitude">
                            <Input style={{ verticalAlign: 'middle', width: 255 }} name="latitude" type="number" min="0" step="any" value={newParkingSpotData.location.latitude} onChange={handleChange} />
                        </Form.Item>
                            <Form.Item
                                label="Longitude:"
                                name="longitude">
                                <Input style={{ verticalAlign: 'middle', width: 244 }} name="longitude" type="number" min="0" step="any" value={newParkingSpotData.location.longitude} onChange={handleChange} />
                            </Form.Item>
                            {
                                !confirmation ? <Button className="button" type="primary" onClick={() => setConfirmation(true)}>Apply changes</Button> : (
                                    <>
                                        <p><strong>Are you sure ?</strong></p>
                                        <Button type="default" success onClick={handleChangeSubmit}>Yes</Button>
                                        &nbsp;

                                    <Button type="primary" danger onClick={() => setConfirmation(false)}>No</Button>
                                    </>
                                )
                            }
                        </>
                    ) : (
                            <>
                                <Form.Item
                                    label="Latitude:"
                                    name="latitude">{parkingSpotData.location.latitude}</Form.Item>
                                <Form.Item
                                    label="Longitude:"
                                    name="longitude">{parkingSpotData.location.longitude}</Form.Item>
                            </>)
                    }
                    {props.activator ? <Activator parkingSpot={props.parkingSpot} /> : null}
                    {props.priceSetter ? <PriceSetter parkingSpot={props.parkingSpot} /> : null}
                    {props.deleter ? <Deleter deleteHandler={props.deleteHandler} id={props.parkingSpot._id}>Can be Deleted</Deleter> : null}
                    <br />
                    <br />
                    {props.modifier ? <Button className="button" type="primary" onClick={() => setEditView(!editView)}>Toggle edit mode</Button> : null}
                </Form>
            </div>
        </OutsetDiv >
    );
}

export default ParkingSpotListItem;