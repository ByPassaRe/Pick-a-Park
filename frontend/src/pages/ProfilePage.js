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

function ProfilePage() {
    const App = ({ user }) => (
        <div>
            Hi {user.username} you are a {user.role}
            <ChangePasswordForm />
            <hr />
            {
                (user.role === "DRIVER") ?
                (
                    <>
                        <BugReportForm />
                        <hr/>
                        <MapPage />
                    </>
                )
                : (user.role === "PARKING_COMPANY") ?
                (
                    <>
                    <BugReportParkingCompanyView/>
                    <hr/>
                    <ParkingSpotsSetPriceView />
                    </>
                )
                : (user.role === "MUNICIPALITY_EMPLOYEE") ?
                (
                    <>
                        <BugReportForm />
                        <hr/>
                        <ParkingSpotCreationForm />
                        <hr/>
                        <ParkingSpotMunicipalityView />

                    </>
                )
                : (user.role === "MUNICIPALITY_POLICE") ?
                (
                    <>
                        <IssueCreationForm/>
                        <hr/>
                        <IssueListView/>
                    </>
                ) :
                (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }

        </div>
    );

    return (
        <div>
            <App user={jwtDecode(localStorage.jwt).payload} />
        </div>
    )

}



export default ProfilePage;