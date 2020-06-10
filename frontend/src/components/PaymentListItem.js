import React from 'react';
import styled from 'styled-components';

const OutsetDiv = styled.div`
    border-style: outset;
    margin: 20px;
`;

const PaymentListItem = (props) => {

    return (
        <OutsetDiv>
            <p>Id: {props.transaction._id}</p>
            <p>User ID: {props.transaction.userId}</p>
            <p>Amount: {props.transaction.amount}</p>
        </OutsetDiv>
    );
}

export default PaymentListItem;