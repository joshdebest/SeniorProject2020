import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem, Col, Row, Button} from 'react-bootstrap';
import AdminModal from './AdminModal';
import {ConfPopup} from '../components';
import './AdminPage.css';

export default class AdminPage extends Component {
   constructor(props) {
      super(props);

      this.props.displayUsers();
      this.state = {
         showModal: false,
         showConfirmation: false
      }
   }

   openModal = (user) => {
      this.setState({showModal : true, editUser : user})
   }

   modalDismiss = (result) => {
      if (result.status === "Ok") {
         if (this.state.editUser)
            this.editUser(result);
         else
            this.createUser(result);
      }
      this.setState({ showModal: false, editUser: null });
   }

   editUser(result) {
      this.props.editUser(this.state.editUser.id, result.title);
      this.props.displayUsers();
   }

   createUser(result) {
      this.props.adminAddUser({ title: result.title });
   }

   openEdit = (usr) => {
      this.setState({ delUser: usr, showConfirmation: true })
   }

   openConfirmation = (usr) => {
      this.setState({ delUser: usr, showConfirmation: true })
   }

   closeConfirmation = (res) => {
      if(res === "Yes"){
         this.props.delUser(this.state.delUser.email);
         this.setState({showConfirmation: false, delUser: null });
      } else {
         console.log(res)
         this.setState({showConfirmation: false, delUser: null });
      }   
   }

   render() {
      console.log("Rerendering admin page ", this.props);
      var userItems = [];

      Object.keys(this.props.Users).forEach(usr => {
            userItems.push(<UserItems
               id={usr.id}
               email={usr.email}
               firstName={usr.firstName}
               lastName={usr.lastName}
               password={usr.password}
               role={usr.role}
               grade={usr.grade}

               showControls={this.props.Users.role === 2}
               onDelete={() => this.openConfirmation(usr)}
               onEdit={() => this.openModal(usr)} />);
      });
      console.log(userItems);

      return (
         <section className="container">
            <h1>Users Overview</h1>
            <ListGroup className="padded">
               {userItems}
            </ListGroup>
            <Button variant="primary" onClick=
               {() => {this.openModal()}}>New User</Button>
            {/* Modal for creating and change cnv */}
            <AdminModal
               showModal={this.state.showModal}
               title={this.state.editUser ? "Edit User" : "New User"}
               usr={this.state.editUser}
               onDismiss={this.modalDismiss} />
            <ConfPopup
               show={this.state.showConfirmation}
               title="Delete User"
               body={`Are you sure you want to delete this User?
           '${this.state.delUser ? this.state.delCnv.title : ''}'`}
               buttons={['Yes', 'Cancel']}
               onClose={this.closeConfirmation} />
         </section>
      )
   }
}

// list of all users in the database
const UserItems = function (props) {
   console.log(props)
   return (
      <ListGroupItem>
         <Row> 
            <Col sm={4} className="float-left">
               <Link to={"/"}>{props.firstName}</Link>
            </Col>
            <Col sm={4} className="float-left">
               <Link to={"/"}>{props.lastName}</Link>
            </Col>
            
            {props.showControls ?
               <Col sm={4} className="float-right right-text">
                  <Button size="sm" onClick={props.onDelete} 
                   className="favicon">
                     <span className="fa fa-trash"/>
                  </Button>
                  <Button size="sm" onClick={props.onEdit} className="favicon">
                     <span className="fa fa-edit"/>
                  </Button>
               </Col>
               : ''}
         </Row>
      </ListGroupItem>
   )
}