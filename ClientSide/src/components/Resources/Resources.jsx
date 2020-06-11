import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
//import Sidebar from './Sidebar.js'
import './Resources.css';

export default class Resources extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      console.log("Redrawing Resources Page");
      return (
         <div className="d-flex" id="wrapper">
         <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Student Resources</div>
            <div className="list-group list-group-flush">
            <a href="/lessons" className="list-group-item list-group-item-action bg-light">Lessons</a>
            <a href="/manuals" className="list-group-item list-group-item-action bg-light">Vex Manuals</a>
            <a href="/slides" className="list-group-item list-group-item-action bg-light">Instruction Slides</a>
            <a href="/docs" className="list-group-item list-group-item-action bg-light">Misc Documents</a>
            </div>
         </div>

         <div id="page-content-wrapper">

            <div className="container-fluid">
            <h1 className="mt-4">Student Resources Page</h1>
            <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
            </div>
         </div>
      </div>    
      );
   }
}
