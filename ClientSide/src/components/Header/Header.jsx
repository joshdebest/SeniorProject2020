import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Header.css';

const LoggedOutView = props => {
 // if (!props.currentUser) {
    return (
      <Navbar expand="lg" variant="dark">

      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Nav className="ml_auto">
          <NavDropdown title="The Team" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
            <NavDropdown.Item href="/join">Join DeBest Robotics</NavDropdown.Item>
            <NavDropdown.Item href="/awards">Awards</NavDropdown.Item>
          </NavDropdown>

          <Nav.Item><Nav.Link href="/calender">Calender</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/store">Store</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Log In</Nav.Link></Nav.Item> 
        </Nav>

      </Navbar>
    );
  //}
  //return null;
};

/* const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
}; */
//           <LoggedInView currentUser={this.props.currentUser} />

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container">

          <Link to="/" className="navbar-logo">
            <img src={require('../../DeBestRoboticsLogo.png')} 
               width="130"
               height="70"
               className="d-inline-block align-top"/>
          </Link>

          <LoggedOutView />

        </div>
      </nav>
    );
  }
}

export default Header;