import React from 'react';
import { Route, Redirect } from 'react-router';
import localStorageService from "../services/LocalStorage";

function PrivateRoute({ children ,...rest }) {
    return (
        <Route {...rest}
        render={() =>
            localStorageService.getAccessToken() ? 
            ( children ) 
            : 
            ( <Redirect to={{ pathname: "/"}} /> )
        }
        />
    );
}

export {PrivateRoute};