import React, { Component } from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {Navbar, Nav, NavDropdown, NavItem, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {NavigationBar, Carousel, AboutUs, LogIn} from '../components';
import styled from 'styled-components';
import './Home.css';

var ProtectedRoute = ({component: Cmp, path, ...rest }) => {
   return (<Route path={path} render={(props) => {
      return Object.keys(rest.User).length !== 0 ?
      <Cmp {...rest}/> : <Redirect to='/login'/>;}}/>);
   };

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
   
class Home extends Component {
   constructor(props){
      super(props);
   }
    signedIn() {
       return Object.keys(this.props.User).length !== 0; // Nonempty User obj
    }
/*    state = {
      activeSlideIndex: 0,
   }
   setActiveSlideIndex = (newActiveSlideIndex) => {
      this.setState({
        activeSlideIndex: newActiveSlideIndex
      });
    } */
   render() {
      console.log("Redrawing homepage");
      return (
         <div className="homeNavBar">

            {/* NAVIGATION BAR*/}
            <Styles>
            <Navbar expand="md" variant="dark">
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



            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
               <Route path='/login' 
                  render={() => <LogIn {...this.props} />} />
               <Route exact path='/about' 
                  render={() => <AboutUs {...this.props} />} />

            </Switch>

          
         </div>
      )
   }
}

export default Home