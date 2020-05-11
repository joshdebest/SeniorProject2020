import React from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .ml-auto {
    padding-right: 50px
  }
`;

export const NavigationBar = props => (
  <Styles>
    <Navbar expand="lg" variant="dark">
      <Navbar.Brand className="navbarlogo" href="#Home">
         <img src={require('../../DeBestRoboticsLogo.png')} 
         width="90"
         height="70"
         className="d-inline-block align-top"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="The Team" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">About Us</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Join DeBest Robotics</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Awards</NavDropdown.Item>
          </NavDropdown>

          <Nav>
            <LinkContainer to='/about'>
            <Nav.Link>TESTING</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav.Item><Nav.Link href="/store">Store</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Log In</Nav.Link></Nav.Item> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)

export default NavigationBar;
