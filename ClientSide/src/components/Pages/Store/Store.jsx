import React, { Component } from 'react';
   
export default class Store extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Calender");
      return (
         <div className="aboutUsNavBar">
            <div className="aboutUsTxt">
            <h1>TESTING STORE</h1>
            <p>DeBest robotics is a robotics program associated with the Pegasus School in Huntington Beach, CA.  
               We are teaching young minds the keys to solving problems and how to work with a team to accomplish a common goal.
            </p>
         </div>
          
         </div>
      )
   }
}
