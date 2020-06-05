import React, { Component } from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';
import {Navbar, Nav, NavItem, ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap';
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
         <div className='aboutUs'>           
				<img src={process.env.PUBLIC_URL + '/images/AboutUs.jpeg'} className='aboutUsImg'/>
            <div className="centered">
               ABOUT US
            </div>
            <h1 style={{paddingTop: '50px'}}>Meet the team</h1>

            <Row className="firstRow">
               <Col sm={8}>
                  <img src={process.env.PUBLIC_URL + '/images/AboutUs2.jpeg'} className='aboutUsImg2'/>
               </Col>
               <Col sm={4}>
                  <p>We are DeBest Robotics, a program dedicated to
                     teaching young students about robotics while emphasizing the 
                     importantance of collaboration and hard work.
                  </p>
               </Col>
            </Row>

            <Row className="secondRow">
               <Col sm={4}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  </p>
               </Col>
               <Col sm={8}>
                  <img src={process.env.PUBLIC_URL + '/images/AboutUs3.jpeg'} className='aboutUsImg3'/>
               </Col>
            </Row>


         </div>
          
      )
   }
}
