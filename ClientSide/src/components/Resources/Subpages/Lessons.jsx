import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
//import './JoinUs.css';

   
export default class Lessons extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <div className="lessons">
         <div className="row">
            <div className="column">
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
