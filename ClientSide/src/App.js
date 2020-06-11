import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as actionCreators from './redux/actionCreators';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import Calendar from './components/Pages/Calendar/Calendar';
import Awards from './components/Pages/Awards/Awards'
import Contact from './components/Pages/Contact/Contact';
import JoinUs from './components/Pages/JoinUs/JoinUs';
import AdminPage from './components/AdminPage/AdminPage';
import Resources from './components/Resources/Resources';
import Docs from './components/Resources/Subpages/Docs';
import Lessons from './components/Resources/Subpages/Lessons';
import Manuals from './components/Resources/Subpages/Manuals';
import Slides from './components/Resources/Subpages/Slides';


import './App.css'

var SafeRoute = ({component: Cmp, path, ...rest }) => {
    return (<Route path={path} render={(props) => {
       return Object.keys(rest.Users).length !== 0 ?
       <Cmp {...rest}/> : <Redirect to='/'/>;}}/>);
    };

class App extends Component {
    componentDidMount() {
        this.props.insertToken()
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState(nextProps);
    }
    loggedIn() {
        return Object.keys(this.props.Users).length !== 0; 
    }
    render() {
        console.log("re-rendering App");
        return (
            <div className="page-container">
            <Header logged_in={this.loggedIn()}/>
            <main role='main' className='flex mr-auto'>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" 
                            render={() => <LogIn {...this.props} />} />
                        <Route path="/signup" 
                            render={() => <Register {...this.props} />}/>
                        <Route path="/about" component={AboutUs} />
                        <Route path="/calender" component={Calendar} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/awards" component={Awards} />                      
                        <Route path="/resources" component={Resources} />
                        <Route path="/join" component={JoinUs} />
                        <Route path="/admin" 
                            render={() => <AdminPage {...this.props} />} />
                        <Route path="/resources/lessons" component={Lessons}/>
                        <Route path="/resources/manuals" component={Manuals}/>
                        <Route path="/resources/slides" component={Slides}/>
                        <Route path="/resources/docs" component={Docs}/>

                    </Switch>
                </div>
            </main>
            <Footer/>
            </div>
        );
    }
  }
const mapStateToProps = state => {
    console.log("State is " + JSON.stringify(state));
    return {
        Users: state.Users,
        Home: state.Home,
        Errs: state.Errs,
        Token: state.Token
    }};
  
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
