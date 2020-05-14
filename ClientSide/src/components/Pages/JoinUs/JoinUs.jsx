import React, { Component } from 'react';
   
export default class JoinUs extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Contact Us");
      return (
         <div className="aboutUsNavBar">
            <div className="aboutUsTxt">
            <h1>TESTING JOIN US</h1>
            <p>DeBest robotics is a robotics program associated with the Pegasus School in Huntington Beach, CA.  
               We are teaching young minds the keys to solving problems and how to work with a team to accomplish a common goal.
            </p>
         </div>
          
         </div>
      )
   }
}
