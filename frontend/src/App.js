import React, { Component } from 'react';
import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import LogoutButton from './pages/LogoutButton';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import { PrivateRoute } from './services/PrivateRoute';

class App extends Component {

  render(){
    return(
        <BrowserRouter>
            <nav>
                <LogoutButton/><br/>
                <Link to="/public">Login and Sign Up</Link><br/>
                <Link to="/profile">Profile</Link>
            </nav>

            <Switch>
              <Route exact path={["/public","/"]}>
                <LoginForm />
                <hr/>
                <UserCreationForm/>
              </Route>

              <PrivateRoute path="/profile">
                <ProfilePage/>
              </PrivateRoute>
              <Route>
                <div>404 Not Found</div>
              </Route>
            </Switch>
        </BrowserRouter>
        
    );
  }
}
export default App;
