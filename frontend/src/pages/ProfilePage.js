import React from 'react';
import { jwtDecode } from 'jwt-js-decode';
import { Redirect } from 'react-router-dom';
import MapPage from './MapPage';
import ParkingSpotCreationForm from './ParkingSpotCreationForm';
import ChangePasswordForm from './ChangePasswordForm';
import ParkingSpotsSetPriceView from './ParkingSpotsSetPriceView';
import ParkingSpotMunicipalityView from './ParkingSpotMunicipalityView';
import BugReportForm from './BugReportForm';
import BugReportParkingCompanyView from './BugReportParkingCompanyView';
import IssueCreationForm from './IssueCreationForm';
import IssueListView from './IssueListView';
import WalletPage from './WalletPage';



function ProfilePage() {
    const {username, role} = jwtDecode(localStorage.jwt).payload;

    let componentProfile = null;

    switch (role) {
        case "DRIVER":
            componentProfile = 
                <>
                    <BugReportForm />
                    <hr/>
                    <WalletPage/>
                    <hr/>
                    <MapPage/> 
                </>
            break;
        case "PARKING_COMPANY":
            componentProfile = 
                <>
                    <BugReportParkingCompanyView/>
                    <hr/>
                    <ParkingSpotsSetPriceView />
                </>
            break;
        case "MUNICIPALITY_EMPLOYEE":
            componentProfile = 
                <>
                    <BugReportForm />
                    <hr/>
                    <ParkingSpotCreationForm />
                    <hr/>
                    <ParkingSpotMunicipalityView />
                </>
            break;
        case "MUNICIPALITY_POLICE":
            componentProfile = 
                <>
                    <IssueCreationForm/>
                    <hr/>
                    <IssueListView/>
                </>
            break;
                
        default:
            componentProfile = <Redirect to={{ pathname: "/login"}} />
            break;
    }
        
    return(
        <div>
            Hi {username} you are a {role}
            <ChangePasswordForm/>
            <hr/>
            {componentProfile}
        </div>
    )

}



export default ProfilePage;