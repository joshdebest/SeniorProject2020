import React, {Component} from 'react';
import {Form, FormGroup, Row, Col, FormControl, Button, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Auth from '../../redux/Auth';
import './LogIn.css';

class LogIn extends Component {
   constructor(props) {
      super(props);

      // Current login state
      this.state = {
         email: 'jdebest@email.com',
         password: 'password',
         user_token: ''
      }

       // bind 'this' to the correct context
       this.handleChange = this.handleChange.bind(this);
       this.logIn = this.logIn.bind(this);
   } 

   // Call redux actionCreator login via props.
   logIn(event) {
      console.log("Component login with " + this.state.email);
      this.props.logIn(this.state, () => this.props.history.push('/'));
      event.preventDefault()
   }

   closeErrorConf = (btn) => {
      this.props.clearErrors();
   }

   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      const newState = {}
      newState[event.target.name] = event.target.value;
      this.setState(newState);
      console.log(newState);
   }

   render() {
      console.log("Rendering logIn");
      return (
         <section className="container">
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
           
               <FormGroup >
                  <Col>
                     <Button className="loginbutton" type="submit" onClick={this.logIn}>
                        Sign in
                     </Button>
                     <LinkContainer to='/register'>
                        <Nav.Link>Create Account</Nav.Link>
                     </LinkContainer>
                 </Col>
               </FormGroup>
            </Form>

      
         </section>
      )
   }
}

export default LogIn;