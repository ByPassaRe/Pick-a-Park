import React from 'react';
import { jwtDecode } from 'jwt-js-decode';
import { Redirect, Link } from 'react-router-dom';
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
import { Typography, Divider, Menu, Layout } from 'antd';
import {FileOutlined,UserOutlined} from '@ant-design/icons';
import '../App.css';
import LogoutButton from './LogoutButton';


function ProfilePage() {



    const { username, role } = jwtDecode(localStorage.jwt).payload;



    let componentProfile = null;
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;


    switch (role) {
        case "DRIVER":
            componentProfile =
                <SubMenu key="sub1" icon={<FileOutlined />} title={<span>Handle</span>} >
                    <Menu.Item key="3">  <Link to="/map"/>Go to the map</Menu.Item>
                    <Menu.Item key="4">  <Link to="/bug"/>New Bug Report</Menu.Item>
                    <Menu.Item key="5">  <Link to="/wallet"/>Set the wallet</Menu.Item>
                </SubMenu>

            break;
        case "PARKING_COMPANY":
            componentProfile =
                <>
                    <BugReportParkingCompanyView />
                    <Divider />
                    <ParkingSpotsSetPriceView />
                </>
            break;
        case "MUNICIPALITY_EMPLOYEE":
            componentProfile =
                <>
                    <BugReportForm />
                    <Divider />
                    <ParkingSpotCreationForm />
                    <Divider />
                    <ParkingSpotMunicipalityView />
                </>
            break;
        case "MUNICIPALITY_POLICE":
            componentProfile =
                <>
                    <IssueCreationForm />
                    <Divider />
                    <IssueListView />
                </>
            break;

        default:
            componentProfile = <Redirect to={{ pathname: "/login" }} />
            break;
    }

    const { Title } = Typography;




    return (
        <>
            <Layout  style={{ height: "150vh", overflow: "auto" }}
>
                <Sider collapsible >
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub1" icon={<UserOutlined />} title={<span>Hi {username}</span>}>
                            <Menu.Item key="1">Cambia Password</Menu.Item>
                            <Menu.Item key="2">Logout Button</Menu.Item>
                        </SubMenu>
                        {componentProfile}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}> 
                    <Title style={{ textAlign: 'center' , color: '#1d2951'}} > Hi {username} you are a {role}</Title>
                    </Header> 
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 20 }}>
                            <MapPage />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Pick-A-Park Created by ByPassaRe </Footer>
                </Layout>
            </Layout>
        </>
    )

}



export default ProfilePage;