import React, {Component} from 'react';
import {Form, FormGroup, Row, Col, FormControl, Button, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Register from '../Register/Register';
import './LogIn.css';

class LogIn extends Component {
   constructor(props) {
      super(props);

      // Current login state
      this.state = {
         email: 'jdebest@email.com',
         password: 'password'
      }

       this.handleChange = this.handleChange.bind(this);
       this.logIn = this.logIn.bind(this);
   } 

   // Call redux actionCreator login via props.
   logIn(event) {
      // checking for admin login, redirect to admin page
      if (this.state.email === 'jdebest@email.com'){
         this.props.logIn(this.state, () => this.props.history.push('/admin'));
         event.preventDefault();
      }
      else{
         this.props.logIn(this.state, () => this.props.history.push('/'));
         event.preventDefault()
      }
   }

   closeErrorConf = (btn) => {
      this.props.clearErrors();
   }

   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      const newState = {}
      newState[event.target.name] = event.target.value;
      this.setState(newState);
      console.log("new state: " + newState);
   }

   render() {
      console.log("Rendering logIn");
      return (
         <div className="login-wrapper">
         <div className="login-container">
            <Col>
               <h1>Log in</h1>
            </Col>
            <Form>
               <FormGroup as={Row} controlId="formHorizontalEmail">
                  <Col as={Form.Label} sm={2}>
                     Email
                  </Col>
                  <Col sm={8}>
                     <FormControl
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      />
                  </Col>
               </FormGroup>
               <FormGroup as={Row} controlId="formHorizontalPassword">
                  <Col as={Form.Label} sm={2}>
                     Password
                  </Col>
                  <Col sm={8}>
                     <FormControl
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                     />
                  </Col>
               </FormGroup>

               {  
                 this.props.Users.type === "LOGIN_ERR" ?

                  <FormGroup controlId="formError" className="error">
                  <Form.Label>Login Error</Form.Label>                     
                  </FormGroup> : ''
              }
           
               <FormGroup as={Row}>
                  <Col>
                     <Button className="loginbutton" type="submit" onClick={this.logIn}>
                        Sign in
                     </Button>
                  </Col>
               </FormGroup>
                  <Row>
                     <LinkContainer to='/signup'>
                        <Nav.Link className="create-account-link">Create Account</Nav.Link>
                     </LinkContainer>
                 </Row>
            </Form>

         </div>
         </div>
      );
   }
}

export default LogIn;