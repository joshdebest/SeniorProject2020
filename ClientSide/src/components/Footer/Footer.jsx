import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
   render(){
      return(
         <footer className="footer">

         <div className="container">
            <ul className="footer_page_links">
               <li><a href="http://localhost:3000/">Home</a></li>
               <li><a href="http://localhost:3000/about">About</a></li>
               <li><a href="http://localhost:3000/join">Join</a></li>
               <li><a href="http://localhost:3000/calender">Calender</a></li>
               <li><a href="http://localhost:3000/contact">Contact</a></li>
            </ul>
         </div>
         <div className='container'>
            <ul className="social_media">
               <li><a href="http://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
               <li><a href="https://twitter.com/DebestRobotics"><i className="fab fa-twitter"></i></a></li>
               <li><a href="http://linkedin.com"><i className="fab fa-linkedin"></i></a></li>
               <li><a href="https://www.instagram.com/debestrobotics/"><i className="fab fa-instagram"></i></a></li>
            </ul>
         </div>

         </footer>
      );
   }
}