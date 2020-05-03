import React from 'react';
import { jwtDecode } from 'jwt-js-decode';
import { Redirect } from 'react-router-dom';
import MapPage from './MapPage';
import ParkingSpotCreationForm from './ParkingSpotCreationForm';
import ChangePasswordForm from './ChangePasswordForm';
import ParkingSpotsSetPriceView from './ParkingSpotsSetPriceView';
import ParkingSpotMunicipalityView from './ParkingSpotMunicipalityView';
import WalletPage from './WalletPage';


function ProfilePage() {
    const {username, role} = jwtDecode(localStorage.jwt).payload;


    let componentProfile = null;

    switch (role) {
        case "DRIVER":
            componentProfile = 
                <>
                    <WalletPage/>
                    <MapPage/> 
                </>
            break;
        case "PARKING_COMPANY":
            componentProfile = 
                <>
                    <ParkingSpotsSetPriceView/>
                </>
            break;
        case "MUNICIPALITY_EMPLOYEE":
            componentProfile = 
                <>
                    <ParkingSpotCreationForm/>
                    <ParkingSpotMunicipalityView/>
                </>
            break;
        case "MUNICIPALITY_POLICE":
            componentProfile = 
                <>
                    Add something
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