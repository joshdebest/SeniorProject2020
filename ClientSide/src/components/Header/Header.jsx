import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Header.css';

const LoggedOutView = () => {
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

          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/calender">Calender</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item> 
        </Nav>

      </Navbar>
    );
  //}
  //return null;
};
const LoggedInView = () => {
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
           <Nav.Item><Nav.Link href="/resources">Resources</Nav.Link></Nav.Item> 
           <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
           <Nav.Item><Nav.Link href="/">Logout</Nav.Link></Nav.Item> 
         </Nav>
 
       </Navbar>
     );
 };


export default function Header ({logged_in}) {

    console.log("Re-rendering Header");
    console.log(logged_in);
    return (
      <nav className="navbar">
        <div className="container">

          <Link to="/" className="navbar-logo">
            <img src={require('../../DeBestRoboticsLogo.png')} 
               width="130"
               height="70"
               style={{margin: "5px"}}
               className="d-inline-block align-top"/>
          </Link>

          {logged_in ?
            <LoggedInView/>
            :
            <LoggedOutView/>
          }
        </div>
      </nav>
    );
  
}

