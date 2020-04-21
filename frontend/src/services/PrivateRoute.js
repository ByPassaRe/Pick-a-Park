import React from 'react';
import { Route, Redirect } from 'react-router';

function PrivateRoute({ children ,...rest }) {
    return (
        <Route {...rest}
        render={() =>
            localStorage.jwt ? 
            ( children ) 
            : 
            ( <Redirect to={{ pathname: "/"}} /> )
        }
        />
    );
}

export {PrivateRoute};