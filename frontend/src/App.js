import React from 'react';

import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import ParkingSpotListView from './pages/ParkingSpotListView';
import ParkingSpotsSetPriceView from './pages/ParkingSpotsSetPriceView';
import ParkingSpotCreationForm from './pages/ParkingSpotCreationForm';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    /*
    <p>Hello world!</p>
    */
   /*
   <React.Fragment>
     <UserCreationForm />
     <p>
       ---------------------------
     </p>
     <LoginForm/>
   </React.Fragment>
    */
    //<ParkingSpotCreationForm/>

    <Router>
      <div>
        <nav>
          <ul>
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
          </ul>
        </nav>

        <Route path="/auth" component={LoginForm} />
        <Route path="/users" component={UserCreationForm} />
        <Route path="/parkingSpotCreation" component={ParkingSpotCreationForm} />
        <Route path="/parkingSpotListView" component={ParkingSpotListView} />
        <Route path="/parkingSpotsSetPriceView" component={ParkingSpotsSetPriceView} />
      </div>
    </Router>
  );
}

export default App;
