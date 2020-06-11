import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
//import './JoinUs.css';

export default class Slides extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <div className="slides">
         <div className="row">
            <div className="column">
            <Link to="/" className="navbar-logo">
               <img src={process.env.PUBLIC_URL + '/images/lesson1.jpeg'} 
                  width="130"
                  height="70"
                  style={{margin: "5px"}}
                  className="d-inline-block align-top"/>
            </Link>
               <img src={process.env.PUBLIC_URL + '/images/lesson1.jpeg'} className='lessonimg'/>
            </div>
            <div className="column"></div>
               <img src={process.env.PUBLIC_URL + '/images/lesson2.jpeg'} className='lessonimg'/>
            <div className="column"></div>
               <img src={process.env.PUBLIC_URL + '/images/lesson3.jpeg'} className='lessonimg'/>
         </div>
          
         </div>
      )
   }
}