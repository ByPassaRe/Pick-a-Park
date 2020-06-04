import React from 'react';
import { jwtDecode } from 'jwt-js-decode';
import { Route, Redirect, Link } from 'react-router-dom';
import MapPage from './MapPage';
import ParkingSpotCreationForm from './ParkingSpotCreationForm';
import ChangePasswordForm from './ChangePasswordForm';
import ParkingSpotsSetPriceView from './ParkingSpotsSetPriceView';
import ParkingSpotMunicipalityView from './ParkingSpotMunicipalityView';
import BugReportForm from './BugReportForm';
import BugReportParkingCompanyView from './BugReportParkingCompanyView';
import IssueCreationForm from './IssueCreationForm';
import IssueListView from './IssueListView';
import WalletPage from './WalletPage';
import { Typography, Menu, Layout, Divider } from 'antd';
import { FileOutlined, UserOutlined } from '@ant-design/icons';
import '../App.css';
import logo from '../image/logo.png';


function ProfilePage() {



    const { username, role } = jwtDecode(localStorage.jwt).payload;



    let componentProfile = null;
    let optionsProfile = null;
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;


    switch (role) {
        case "DRIVER":
            componentProfile =
                <SubMenu key="sub2" icon={<FileOutlined style={{ color: '#247a85' }}/>} title={<span  style={{ color: '#247a85' }}>Handle</span>} >
                    <Menu.Item key="3"> <Link to="/" />Map</Menu.Item>
                    <Menu.Item key="4"> <Link to="/bug" />BugReport</Menu.Item>
                    <Menu.Item key="5"> <Link to="/wallet" />Wallet</Menu.Item>
                </SubMenu>
            optionsProfile =
                <div className="site-layout-background" style={{ padding: 20 }}>
                    <Route exact path="/" component={MapPage} />
                    <Route path="/bug" component={BugReportForm} />
                    <Route path="/wallet" component={WalletPage} />

                </div>

            break;
        case "PARKING_COMPANY":
            componentProfile =
                <SubMenu key="sub2" icon={<FileOutlined style={{ color: '#247a85' }} />} title={<span style={{ color: '#247a85' }}>View</span>} >
                    <Menu.Item key="3"> <Link to="/bugReport" />BugReport</Menu.Item>
                    <Menu.Item key="4"> <Link to="/setPrice" />Set Price</Menu.Item>
                </SubMenu>
            optionsProfile =
                <div className="site-layout-background" style={{ padding: 20 }}>
                    <Route path="/bugReport" component={BugReportParkingCompanyView} />
                    <Route path="/setPrice" component={ParkingSpotsSetPriceView} />
                </div>

            break;
        case "MUNICIPALITY_EMPLOYEE":
            componentProfile =
                <SubMenu key="sub2" icon={<FileOutlined style={{ color: '#247a85' }} />} title={<span style={{ color: '#247a85' }}>Handle</span>} >
                    <Menu.Item key="3"> <Link to="/bug" />BugReport</Menu.Item>
                    <Menu.Item key="4"> <Link to="/spot" />Parking Spot</Menu.Item>
                    <Menu.Item key="5"> <Link to="/spotsview" />Spots View</Menu.Item>
                </SubMenu>
            optionsProfile =
                <div className="site-layout-background" style={{ padding: 20 }}>
                    <Route path="/bug" component={BugReportForm} />
                    <Route path="/spot" component={ParkingSpotCreationForm} />
                    <Route path="/spotsview" component={ParkingSpotMunicipalityView} />
                </div>
                
            break;
        case "MUNICIPALITY_POLICE":
        componentProfile =
                <SubMenu key="sub2" icon={<FileOutlined style={{ color: '#247a85' }}/>} title={<span style={{ color: '#247a85' }}>Issue</span>} >
                    <Menu.Item key="3"> <Link to="/create" />Creation</Menu.Item>
                    <Menu.Item key="4"> <Link to="/view" />View</Menu.Item>
                </SubMenu>
            optionsProfile =
                <div className="site-layout-background" style={{ padding: 20 }}>
                    <Route path="/create" component={IssueCreationForm} />
                    <Route path="/view" component={IssueListView} />
                </div>
        
            break;

        default:
            componentProfile = <Redirect to={{ pathname: "/login" }} />
            break;
    }





    return (
        <>
            <Layout style={{ height: "150vh", overflow: "auto" }}
            >
                <Sider theme="light" collapsible >
                    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item  icon={ <img className="logo-img" src={logo} />}><span style={{ color: '#247a85' }}><strong> Pick A Park</strong></span></Menu.Item> 
                    <Divider></Divider>
                        <SubMenu key="sub1" icon={<UserOutlined />} title={<span>Hi {username}</span>}>
                            <Menu.Item key="1">Cambia Password</Menu.Item>
                            <Menu.Item key="2">Logout Button</Menu.Item>
                        </SubMenu>
                        {componentProfile}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <h2 style={{ textAlign: 'center', color: '#247a85' }} > Hi {username} you are a {role}</h2>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {optionsProfile}

                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#247a85'  }}><img className="logo-img" src={logo} /> <b>Pick-A-Park</b> Created by <i>ByPassaRe</i> </Footer>
                </Layout>
            </Layout>
        </>
    )

}



export default ProfilePage;