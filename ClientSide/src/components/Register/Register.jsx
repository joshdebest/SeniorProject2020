import React, {Component} from 'react';
import {Form, FormGroup, Row, Col, FormControl, Button, Alert} from 'react-bootstrap';
import './Register.css';

function FieldGroup({id, label, help, ...props }) {
   return (
       <FormGroup controlId={id}>
          <Form.Label>{label}</Form.Label>
          <Form.Control {...props} />
          {help && <Form.Text className="text-muted">{help}</Form.Text>}
       </FormGroup>
   );
}

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         verifyPwd: '',
         grade: 0,
         role: 0
      }
      this.handleChange = this.handleChange.bind(this);
      this.signup = this.signup.bind(this);
   } 

   signup(event) {
      let { // Make a copy of the relevant values in current state
         firstName,
         lastName,
         email,
         password,
         grade,
         role
      } = this.state;

      const user = {
         firstName,
         lastName,
         email,
         password,
         grade,
         role
      };

      this.props.register(user, () => this.props.history.push('/'));
      event.preventDefault();

   }

   validForm(){
      let temp_state = this.state;
      return temp_state.firstName && temp_state.lastName && temp_state.email &&
         temp_state.password === temp_state.verifyPwd;
   }

   // Continually update state as letters typed. Rerenders, but no DOM change!
   handleChange(event) {
      let newState = {}
      switch (event.target.type){
         case 'checkbox':
            if (event.target.id === "role"){
               if (event.target.checked)
                  newState[event.target.id] = 1;
               else
                  newState[event.target.id] = 0;
            }
            else{
               newState[event.target.id] = event.target.checked;
            }
            break;
         default:
            newState[event.target.id] = event.target.value;
      }
      this.setState(newState);
   }

   render() {
      console.log("Rendering Register");
      return (
         <div className="register-container">
            <Col>
               <h1>Register</h1>
            </Col>
            <Form>
               <FieldGroup id="firstName" type="firstName" label="First Name"
                  placeholder="Enter Your First Name" value={this.state.firstName}
                  onChange={this.handleChange} required={true}
                  />
               <FieldGroup id="lastName" type="lastName" label="Last Name"
                  placeholder="Enter Your Last Name" value={this.state.lastName}
                  onChange={this.handleChange} required={true}
                  />
               <FieldGroup id="email" type="email" label="Email Address"
                  placeholder="Enter email" value={this.state.email}
                  onChange={this.handleChange} required={true}
                  />
               <FieldGroup id="password" type="password" label="Pasword"
                  placeholder="Enter Password" value={this.state.password}
                  onChange={this.handleChange} required={true}
                  />
               <FieldGroup id="verifyPwd" type="password" label="Re-enter Password"
                  value={this.state.verifyPwd}
                  onChange={this.handleChange} required={true}
                  />

               <select className="custom-select" id="inputGroupSelect01" label="Grade">
                  <option defaultValue value="0">Select grade...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
               </select>

               <br></br>  

               <Form.Check  id="role"
                  value={this.state.role} onChange={this.handleChange}
                  label="Check box if Parent"/>
               <br></br>
            </Form>
         
         {this.state.password !== this.state.verifyPwd ?
            <Alert variant="warning">
               Passwords don't match
            </Alert> : ''}
         
         <Button className="signupbutton" type='submit' onClick={this.signup} disabled={!this.validForm()}>
            Sign Up
         </Button>
         </div>
      )
   }
}

export default Register;