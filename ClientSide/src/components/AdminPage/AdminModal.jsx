import React, { Component } from 'react';
import {
    Modal, Button, Form, FormControl, FormGroup
} from 'react-bootstrap';

export default class AdminModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   close = (result) => {
      this.props.onDismiss && this.props.onDismiss({
         status: result,
         title: this.state.userName
      });
   }

   getValidationState = () => {
      if (this.state.userName) {
         return null;
      }
      return "warning";
   }

   handleChange = (e) => {
      this.setState({userName: e.target.value});
   }

   componentWillReceiveProps = (nextProps) => {
      if (nextProps.showModal) {
         this.setState(
          { userName: (nextProps.usr && nextProps.cnv.firstName) || "" })
      }
   }

   render() {
      return (
         <Modal show={this.props.showModal} onHide={() => this.close("Cancel")}>
            <Modal.Header closeButton>
               <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={(e) =>
                  e.preventDefault() || this.state.userName.length ?
                     this.close("Ok") : this.close("Cancel")}>
                  <FormGroup controlId="formBasicText"
                   validationstate={this.getValidationState()}
                  >
                     <Form.Label>
                     {"Enter First Name"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="First Name"
                        onChange={this.handleChange}
                     />
                     
                     <Form.Label>
                     {"Enter Last name"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="Last Name"
                        onChange={this.handleChange}/>

                     <Form.Label>
                     {"Enter email"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="Email"
                        onChange={this.handleChange}
                     />
                     <FormControl.Feedback />
                     {!(this.state.userName) && 
                     <Form.Text className="text-muted">
                        Title is required
                     </Form.Text>
                     }

                     <Form.Label>
                     {"Create a Password"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="Password"
                        onChange={this.handleChange}/>

                     <Form.Label>
                     {"Enter Grade"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="Grade"
                        onChange={this.handleChange}/>

                     <Form.Label>
                     {"Enter Role"}
                     </Form.Label>
                     <FormControl
                        type="text"
                        value={this.state.userName}
                        placeholder="Role"
                        onChange={this.handleChange}/>


                  </FormGroup>
               </form>
            </Modal.Body>
            <Modal.Footer>
               <Button 
                onClick={() => this.close("Ok")}>Ok</Button>
               <Button onClick={() => this.close("Cancel")}>Cancel</Button>
            </Modal.Footer>
         </Modal>)
   }
}