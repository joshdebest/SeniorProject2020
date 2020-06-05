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
           <Nav.Item><Nav.Link href="/store">Store</Nav.Link></Nav.Item> 
           <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
           <Nav.Item><Nav.Link href="/login">Sign Out</Nav.Link></Nav.Item> 
         </Nav>
 
       </Navbar>
     );
 };


export default function Header ({user_token}) {
 /* constructor(props) {
    super(props);
    this.state = {
       curr_user: (this.props.Users && this.props.Users) || "",
    }
 }

 componentWillReceiveProps = (nextProps) => {
  if (nextProps.curr_user) {
     this.setState(
      { curr_user: (nextProps.email) || "" })
  }
} 

  signedIn() {
    return Object.keys(this.props.Users).length !== 0; // Nonempty Prss obj
  }

  render() {
    console.log("Rendering Header");
    console.log(this.props.email);
  }*/
    console.log("Re-rendering Header");
    console.log(user_token);
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

          {(user_token) ?
            <LoggedInView/>
            :
            <LoggedOutView/>
          }
        </div>
      </nav>
    );
  
}

