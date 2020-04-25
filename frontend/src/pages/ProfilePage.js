import React from 'react';
import { jwtDecode } from 'jwt-js-decode';
import { Redirect } from 'react-router-dom';
import MapPage from './MapPage';
import ParkingSpotCreationForm from './ParkingSpotCreationForm';
import ChangePasswordForm from './ChangePasswordForm';
import ParkingSpotsSetPriceView from './ParkingSpotsSetPriceView';
import ParkingSpotMunicipalityView from './ParkingSpotMunicipalityView';


function ProfilePage() {
    const App = ({ user }) => (
    <div>
        Hi {user.username} you are a {user.role}
        <ChangePasswordForm/>
        <hr/>
        {
            (user.role === "DRIVER")? 
            (
                <MapPage/> 
            )
            :(user.role === "PARKING_COMPANY")?
            (
                <ParkingSpotsSetPriceView/>
            )
            :(user.role === "MUNICIPALITY_EMPLOYEE")?
            (
                <>
                    <ParkingSpotCreationForm/>
                    <ParkingSpotMunicipalityView/>
                </>
            )
            :(user.role === "MUNICIPAITY_POLICE")?
            (
                <div>TODO</div>
            ):
            (
                <Redirect to={{ pathname: "/login"}} />
            )
        }

    </div>
    );
      
    return(
        <div>
            <App user={jwtDecode(localStorage.jwt).payload} />
        </div>
    )
      
}



export default ProfilePage;