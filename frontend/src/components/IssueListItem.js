import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button , Form} from 'antd';
import '../App.css';
const OutsetDiv = styled.div`
    border-style: outset;
    margin: 45px;
    box-shadow: 10px 10px 5px #dce8ea;

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
            <Button type="primary" danger onClick={handleSend}><font color="white"><strong>Solve</strong></font></Button>
        </>
    )
}
const SolvedIssue = () => {
    return (
        <>
            <p><strong><font color="green">Solved!</font></strong></p>
        </>
    )
};


const IssueListItem = (props) => {
    console.log(props.issue);

    return (
        <OutsetDiv>
             <div className="form-container">
             <Form
                name="Issue"
                className="issue-form">
                <Form.Item
                    label="Id:"
                    name="id">
                   <strong>{props.issue._id}</strong> 
                </Form.Item>
                <Form.Item
                    label="Description of the Issue:"
                    name="description"> 
                    <strong>{props.issue.text}</strong>
                </Form.Item>
                <Form.Item
                    label="Parking Spot:"
                    name="parking spot"> 
                    <strong>{props.issue.parkingSpot}</strong>
                </Form.Item>
                {(props.issue.solved === false) ? <IssueResolution id={props.issue._id} verify={props.verify} solved={props.issue.solved}  issue={props.issue}  /> : <SolvedIssue />}

            </Form>
            </div>
        </OutsetDiv>
    );
}

export default IssueListItem;