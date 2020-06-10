import React from 'react';
import styled from 'styled-components';
import {  Form } from 'antd';
import '../App.css';

const OutsetDiv = styled.div`
border-style: outset;
margin: 45px;
box-shadow: 10px 10px 5px #dce8ea;
`;

const PaymentListItem = (props) => {

    return (
        <OutsetDiv>
            <div className="form-container">
                <Form
                    name="paymentList"
                    className="payment-form">
                    <Form.Item
                        label="Id:"
                        name="id"
                    ><strong>{props.transaction._id}</strong>
                    </Form.Item>
                    <Form.Item
                        label="User ID:"
                        name="user id"
                    ><strong> {props.transaction.userId}</strong>
                    </Form.Item>
                    <Form.Item
                        label="Amount:"
                        name="amount"
                    ><strong>{props.transaction.amount}</strong>
                    </Form.Item>
                </Form>
                </div>
        </OutsetDiv>
            );
        }
        
export default PaymentListItem;