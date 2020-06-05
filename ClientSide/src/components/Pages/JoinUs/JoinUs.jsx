import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import './JoinUs.css';

   
export default class JoinUs extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Join Us Page");
      return (
         <div className='joinUs'>           
				<img src={process.env.PUBLIC_URL + '/images/JoinUs.jpeg'} className='joinUsImg'/>
            <div className="centered">
               JOIN THE TEAM
            </div>
            <h1 style={{paddingTop: '50px'}}>2020 Membership Information</h1>

            <Row className="pagetxt">
               <p>DeBest Robotics gives students the wonderful opportunity to work with a group of like-minded students 
                  while getting hands-on experience of building and fixing robots.  By joining the program, students 
                  will spend (*x amount) of weeks designing and building a robot for their team to compete in a VEX 
                  Robotics Competition held around various schools in Orange County (See calender for full tournament schedule). 
                  The lessons learned and relationships formed amongst  peers will last a lifetime, don’t miss out on the opportunity 
                  to sign up for the upcoming season!
               </p>

               <p style={{paddingTop: '50px'}}>Click here to submit your application.</p>
            </Row>
         </div>
          
      )
   }
}
