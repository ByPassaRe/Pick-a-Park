import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const IssueResolution = (props) => {
    const handleSend = async () => {
        try {
            const response= await axios.post(`http://localhost:5000/issues/${props.id}`);
            console.log(response.data);
        } catch (err) {
            alert(err);
        }
        alert("Issue"+props.id+"updated");
      props.deleteIssue(props.id);

        //richiamo la funzione e gestisco i cambiamenti 
        // qualora il solved sia a true rendo disattivo il bottone 
    }
    return (
        <>
           {(props.solved === false) ?<button onClick={handleSend }><font color= "red">Solve</font></button>: <p><font color= "green">Solved!</font></p>}
        </>
    )
}

const IssueListItem = (props) => {

    return (
        <OutsetDiv>
            <p>Id: {props.issue._id}</p>
            <p>Description: {props.issue.text}</p>
            <p>Parking Spot: {props.issue.parkingSpot}</p>
            <IssueResolution id={props.issue._id} solved={props.issue.solved} updateIssueState={props.updateIssueState} deleteIssue={props.deleteIssue} />

        </OutsetDiv>
    );
}

export default IssueListItem;