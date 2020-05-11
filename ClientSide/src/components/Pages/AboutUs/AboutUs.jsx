import React, { Component } from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';
import {Navbar, Nav, NavItem, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {NavigationBar} from '../../components';
import './AboutUs.css';
   
export default class AboutUs extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing About Us");
      return (
         <div className="aboutUsNavBar">
            <div className="aboutUsTxt">
            <h1>TESTING ROUTES</h1>
            <p>DeBest robotics is a robotics program associated with the Pegasus School in Huntington Beach, CA.  
               We are teaching young minds the keys to solving problems and how to work with a team to accomplish a common goal.
            </p>
         </div>
          
         </div>
      )
   }
}
