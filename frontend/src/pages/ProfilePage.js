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
import { Typography, Divider, Spin } from 'antd';
import '../App.css';


function ProfilePage() {
    const { username, role } = jwtDecode(localStorage.jwt).payload;
    

    let componentProfile = null;

    switch (role) {
        case "DRIVER":
            componentProfile =
                <>  

                    <BugReportForm />
                    <Divider/>
                    <WalletPage />
                    <Divider/>
                    <MapPage />
                </>
            break;
        case "PARKING_COMPANY":
            componentProfile =
                <>
                    <BugReportParkingCompanyView />
                    <Divider/>
                    <ParkingSpotsSetPriceView />
                </>
            break;
        case "MUNICIPALITY_EMPLOYEE":
            componentProfile =
                <>
                    <BugReportForm />
                    <Divider/>
                    <ParkingSpotCreationForm />
                    <Divider/>
                    <ParkingSpotMunicipalityView />
                </>
            break;
        case "MUNICIPALITY_POLICE":
            componentProfile =
                <>
                    <IssueCreationForm />
                    <Divider/>
                    <IssueListView />
                </>
            break;

        default:
            componentProfile = <Redirect to={{ pathname: "/login" }} />
            break;
    }

    const { Title } = Typography;


    return (
        <div style={{
            position: 'absolute'
        }}
        >
            <Title > Hi {username} you are a {role}</Title>
            <ChangePasswordForm />
            <Divider/>
            {componentProfile}
        </div>
    )

}



export default ProfilePage;