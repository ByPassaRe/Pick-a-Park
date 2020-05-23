import React, { Component } from 'react';
import UserCreationForm from './pages/UserCreationForm';
import LoginForm from './pages/LoginForm';
import LogoutButton from './pages/LogoutButton';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ProfilePage from './pages/ProfilePage';
import BugReportForm from './pages/BugReportForm';
import WalletPage from './pages/WalletPage';
import MapPage from './pages/MapPage';


import { PrivateRoute } from './services/PrivateRoute';
import localStorageService from "./services/LocalStorage";
import { Typography, Divider } from 'antd';



import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLogged: false };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (localStorageService.getAccessToken())
      this.setState({ isLogged: true });
    else
      this.setState({ isLogged: false });
  }


  logout() {
    this.setState({ isLogged: false });
  }

  login() {
    this.setState({ isLogged: true });
  }

  render() {

    const { isLogged } = this.state;
    const { Title } = Typography;

    return (
      <BrowserRouter>
        <div>
          <nav>
            {(isLogged) ?
              (<LogoutButton logout={this.logout} />)
              :
              (<Title align="center">This is Pick-A-Park</Title>)
            }
          </nav>

          <Switch>
            <Route exact path={"/login"}>
              <div>
                <LoginForm login={this.login} />
                <Divider>
                  <Link to="/register">Register now!
                </Link>
                </Divider>
              </div>

            </Route>
            <Route exact path={"/register"}>
              <div>
                <UserCreationForm register={this.register} />
              </div>
            </Route>

            //DRIVER 
            <Route exact path={"/bug"}>
              <div>
                <BugReportForm bug={this.bug} />
              </div>
            </Route>
            <Route exact path={"/wallet"}>
              <div>
                <WalletPage wallet={this.wallet} />
              </div>
            </Route>
            <Route exact path={"/map"}>
              <div>
                <MapPage map={this.map} />
              </div>
            </Route>
            


            <PrivateRoute path="/">
              <ProfilePage />
            </PrivateRoute>
            <Route>
              <div>404 Not Found</div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
