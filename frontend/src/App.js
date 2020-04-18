import React, { Component } from 'react';
import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import ParkingSpotMunicipalityView from './pages/ParkingSpotMunicipalityView';
import LogoutButton from './pages/LogoutButton';
import ParkingSpotsSetPriceView from './pages/ParkingSpotsSetPriceView';
import ParkingSpotCreationForm from './pages/ParkingSpotCreationForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MapPage from './pages/MapPage';


class App extends Component {
  render() {
    return (
      <Router>
        <LogoutButton />
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
              <Link to="/parkingSpotMunicipalityView">Parking Spots Municipality View</Link>
            </li>
            <li>
              <Link to="/parkingSpotsSetPriceView">Set parking spot prices</Link>
            </li>
          </ul>
        </nav>

        <Route path="/map" component={MapPage} />
        <Route path="/auth" component={LoginForm} />
        <Route path="/users" component={UserCreationForm} />
        <Route path="/parkingSpotCreation" component={ParkingSpotCreationForm} />
        <Route path="/parkingSpotMunicipalityView" component={ParkingSpotMunicipalityView} />
        <Route path="/parkingSpotsSetPriceView" component={ParkingSpotsSetPriceView} />
    </Router>
      
    )
  }
}
export default App;
