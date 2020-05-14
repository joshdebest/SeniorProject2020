import React, { Component } from 'react';
   
export default class Calender extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Calender");
      return (
         <div className="aboutUsNavBar">
            <div className="aboutUsTxt">
            <h1>TESTING CALENDER</h1>
            <p>DeBest robotics is a robotics program associated with the Pegasus School in Huntington Beach, CA.  
               We are teaching young minds the keys to solving problems and how to work with a team to accomplish a common goal.
            </p>
         </div>
          
         </div>
      )
   }
}
