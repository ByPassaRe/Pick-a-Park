import React from 'react';
import styled from 'styled-components';
import {  Form } from 'antd';
import '../App.css';
const OutsetDiv = styled.div`
    border-style: outset;
    margin: 45px;
    box-shadow: 10px 10px 5px #dce8ea;

`;

const BugReportListItem = (props) => {

    return (
        <OutsetDiv>
            <div className="form-container">
            <Form
                name="bugReport"
                className="burReport-form">
                <Form.Item
                    label="Id:"
                    name="id">
                   <strong>{props.bugReport._id}</strong> 
                </Form.Item>
                <Form.Item
                    label="Description of the Bug:"
                    name="description"> 
                    <strong>{props.bugReport.text}</strong>
                </Form.Item>
            </Form>
            </div>
        </OutsetDiv>
    );
}

export default BugReportListItem;