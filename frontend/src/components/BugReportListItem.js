import React from 'react';
import styled from 'styled-components';
const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const BugReportListItem = (props) => {

    return (
        <OutsetDiv>
            <p>Id: {props.bugReport._id}</p>
            <p>Description of the Bug: {props.bugReport.text}</p>

        </OutsetDiv>
    );
}

export default BugReportListItem;