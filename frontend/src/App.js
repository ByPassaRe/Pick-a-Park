import React, { Component } from 'react';
import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import ParkingSpotListView from './pages/ParkingSpotListView';
import LogoutButton from './pages/LogoutButton';
import ParkingSpotsSetPriceView from './pages/ParkingSpotsSetPriceView';
import ParkingSpotCreationForm from './pages/ParkingSpotCreationForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapPage from './pages/MapPage';
import ChangePasswordForm from './pages/ChangePasswordForm';


class App extends Component {

  render() {
    const loggedUser = localStorage.jwt;

    return (
      <Router>
        
        {(loggedUser) && <LogoutButton />}
        
        <nav>
          <ul>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            <li>
              <Link to="/users">Create User</Link>
            </li>
            <li>
              <Link to="/parkingSpotCreation">Parking Spot Creation</Link>
            </li>
            <li>
              <Link to="/parkingSpotListView">Parking Spots List</Link>
            </li>
            <li>
              <Link to="/parkingSpotsSetPriceView">Set parking spot prices</Link>
            </li>
            <li>
              <Link to="/changePassword">Change Password</Link>
            </li>
          </ul>
        </nav>

        <Route path="/map" component={MapPage} />
        <Route path="/auth" component={LoginForm} />
        <Route path="/users" component={UserCreationForm} />
        <Route path="/parkingSpotCreation" component={ParkingSpotCreationForm} />
        <Route path="/parkingSpotListView" component={ParkingSpotListView} />
        <Route path="/parkingSpotsSetPriceView" component={ParkingSpotsSetPriceView} />
        <Route path="/changePassword" component={ChangePasswordForm} />
    </Router>
      
    )
  }
}
export default App;
