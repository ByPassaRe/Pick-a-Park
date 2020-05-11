import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'antd';
import '../App.css';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const IssueResolution = (props) => {
    const handleSend = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/issues/${props.id}`);
            console.log(response.data);
        } catch (err) {
            alert(err);
        }

        alert("Issue" + props.id + "updated");
        props.verify();
    }
    
    
    return (
        <>
            <Button onClick={handleSend}><font color="red">Solve</font></Button>
        </>
    )
}
const SolvedIssue = () => {
    return (
        <>
            <p><font color="green">Solved!</font></p>
        </>
    )
};


const IssueListItem = (props) => {
    console.log(props.issue);

    return (
        <OutsetDiv>
            <p>Id: {props.issue._id}</p>
            <p>Description: {props.issue.text}</p>
            <p>Parking Spot: {props.issue.parkingSpot}</p>
            {(props.issue.solved === false) ? <IssueResolution id={props.issue._id} verify={props.verify} solved={props.issue.solved}  issue={props.issue}  /> : <SolvedIssue />}

        </OutsetDiv>
    );
}

export default IssueListItem;