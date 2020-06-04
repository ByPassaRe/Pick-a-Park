import React, {useState, useEffect} from 'react';
import axios from "../services/axiosService";

import BugReportListItem from './../components/BugReportListItem';


function BugReportCompanyView(){
    const [statusMessage, setStatusMessage] = useState(null);
    const [bugReports, setBugReports] = useState(null);
    useEffect(() => {
        (async function fetchIssues (){
            setStatusMessage('Loading...');
            try {
                const response = await axios.get('http://localhost:5000/bugReports');
                setBugReports(response.data.bugReports);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };
        })();
    }, []);
    
   
    const renderBug = (bugReport) => <BugReportListItem key={bugReport._id}  bugReport = {bugReport}/>
    return(
        <>
        <h2>Bug:</h2>
        {bugReports ?
        bugReports.map(renderBug):
        <p>{statusMessage}</p>}
        </>
    );
}
export default BugReportCompanyView;