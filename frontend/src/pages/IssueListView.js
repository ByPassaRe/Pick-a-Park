import React, {useState, useEffect} from 'react';
import axios from 'axios';

import IssueListItem from './../components/IssueListItem';


function IssueListView(){
    const [statusMessage, setStatusMessage] = useState(null);
    const [issues, setIssues] = useState(null);
    useEffect(() => {

        (async function fetchIssues (){
            setStatusMessage('Loading...');
            try {

                const response = await axios.get('http://localhost:5000/issues');
                console.error(response.data.issues);

                setIssues(response.data.issues);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };
        })();
    }, []);
    async function verify(){
       const up = await  axios.get('http://localhost:5000/issues');
    setIssues(up.data.issues);
    }
    

    const renderIssue = (issue) => <IssueListItem key={issue._id} verify ={verify} issue = {issue}/>
    return(
        <>
        <h2>Issues</h2>
        {issues ?
        issues.map(renderIssue):
        <p>{statusMessage}</p>}
        </>
    );
}
export default IssueListView;