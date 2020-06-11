import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import './Contact.css';

   
export default class Contact extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Contact Us Page");
      return (
         <div className='contactUs'>           
				<img src={process.env.PUBLIC_URL + '/images/ContactUs.jpeg'} className='contactUsImg'/>
            <div className="centered">
               Contact Us
            </div>
            <h1 style={{paddingTop: '50px', paddingBottom: '50px'}}>Get In Touch</h1>

            <div className="row">
               <Col>
                  <h1 className="contactHeader">The Pegasus School</h1>
                  <p className="contactinfo">19692 Lexington Ln</p>
                  <p className="contactinfo">Huntington Beach, CA 92646</p>
               </Col>
               <Col>

               </Col>
               <Col>
                  <h1 className="contactHeader">Contact Information</h1>
                  <p className="contactinfo">(123)-456-7890</p>
                  <p className="contactinfo">Monday-Saturday</p>
                  <p className="contactinfo">2:30PM - 5:30PM</p>
                  <p className="contactinfo">debestrobotics@gmail.com</p>
               </Col>
               <Col>
                  <div className='container'>
                     <ul className="contactUs_social_media">
                        <li><a href="http://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://twitter.com/DebestRobotics"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="http://linkedin.com"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="http://instagram.com/debestrobotics"><i className="fab fa-instagram"></i></a></li>
                     </ul>
                  </div>
               </Col>
            </div>
         </div>
          
      )
   }
}

