import React from 'react';
import styled from 'styled-components';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;
   


const IssueListItem = (props) => {
    return (
        <OutsetDiv>
            <p>Id: {props.issue._id}</p>
            <p>Text: {props.issue.text}</p>
            <p>Parking Spot: {props.issue.parkingSpot}</p>
        </OutsetDiv>
    );
}

export default IssueListItem;