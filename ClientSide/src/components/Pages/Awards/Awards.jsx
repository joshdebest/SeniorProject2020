import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Awards.css';

export default class Awards extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <div className="awards">
         <div className="row">
            <div className="column">
               <img src={process.env.PUBLIC_URL + '/images/Awards1.jpeg'} className='awardimg'/>
            </div>
            <div className="column">
               <img src={process.env.PUBLIC_URL + '/images/Awards2.jpeg'} className='awardimg'/>
            </div>
            <div className="column">
               <img src={process.env.PUBLIC_URL + '/images/Carousel5.jpeg'} className='awardimg'/>
            </div>

            <h2 style={{marginTop:'50px'}}>Some photos from our 2019 team!</h2>
            
          </div>
         </div>
      )
   }
}