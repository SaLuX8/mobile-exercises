import React from 'react';
import { Navbar, Image, NavItem } from 'react-bootstrap';
import { HashRouter as Router, Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import navImage from './7.jpg'

// Sivuston navbar
class PageNavBar extends React.Component {

    render() {
        console.log("navbar versio: 17");
        return (
            <Router>
                <Navbar bg="primary" variant="dark" sticky="top">
                    <Navbar.Brand> <Link to='/'> <Image src={navImage} style={{ width: '40px', height: '40px' }} roundedCircle alt="NavBar" /></Link>  </Navbar.Brand>
                    <NavItem className="mr-auto" id='nav'>
                        <Link to='/haku'>Yritykset</Link>
                        <Link to='/info'>Info</Link>
                    </NavItem>
                </Navbar>
            </Router>
        )
    }
}
export default PageNavBar;

