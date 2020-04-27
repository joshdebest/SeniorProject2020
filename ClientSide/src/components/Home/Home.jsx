import React, { Component } from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';
import {Navbar, Nav, NavItem, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Home.css';

var ProtectedRoute = ({component: Cmp, path, ...rest }) => {
   return (<Route path={path} render={(props) => {
      return Object.keys(rest.Usr).length !== 0 ?
      <Cmp {...rest}/> : <Redirect to='/signin'/>;}}/>);
   };
   
class Home extends Component {
   
   // signedIn() {
   //    return Object.keys(this.props.Usr).length !== 0; // Nonempty Prss obj
   // }
   render() {
      console.log("Redrawing homepage");
      return (
         <div>
            <div>
               <Navbar expand="md">
                  <Navbar.Toggle />
                  <Navbar.Collapse className="flex mr-auto">
                     <Nav variant="pills" className="justify-content-left">
                        
                        <LinkContainer to='/login' key={0}>
                           <Nav.Link>Login</Nav.Link>
                        </LinkContainer>,
                        <LinkContainer to='/signup' key={1}>
                           <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                           
                     </Nav>

                  </Navbar.Collapse>
                                    
                  
               </Navbar>
         </div>

            {/*Alternate pages beneath navbar, based on current route*/}
            {/* <Switch>
               <Route exact path='/'
                  component={() => Object.keys(this.props.Prss).length !== 0 ? 
                     <Redirect to="/allCnvs" /> : <Redirect to="/signin" />} />
                 <Route path='/signin' 
                  render={() => <SignIn {...this.props} />} />
                 <Route path='/register'
                  render={() => <Register {...this.props} />} />
                 <ProtectedRoute path='/allCnvs' component={CnvOverview}
                  {...this.props}/>
                 <ProtectedRoute path='/myCnvs' component={CnvOverview}
                  userOnly={true} {...this.props}/>
                  <ProtectedRoute path={`/CnvDetail/`} component={CnvDetail}
                  userOnly={true} {...this.props}/>
               />
               
               />
            </Switch> */}
          
         </div>
      )
   }
}

export default Home