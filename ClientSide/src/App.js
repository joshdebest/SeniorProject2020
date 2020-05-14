import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import Calender from './components/Pages/Calender/Calender';
import Contact from './components/Pages/Contact/Contact';
import Store from './components/Pages/Store/Store';
import JoinUs from './components/Pages/JoinUs/JoinUs';
import './App.css'

import { push } from 'react-router-redux';
import {store} from './store';

const mapStateToProps = state => {
    return {
        Users: state.Users,
        Errs: state.Errs,
        /* appLoaded: state.common.appLoaded,
        appName: state.common.appName,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo */
    }};
  
  const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
      dispatch({ type: 'APP_LOAD', payload, token, skipTracking: true }),
    onRedirect: () =>
      dispatch({ type: 'REDIRECT' })
  });

class App extends Component {
    componentWillReceiveProps(nextProps) {
      if (nextProps.redirectTo) {
        store.dispatch(push(nextProps.redirectTo));
        this.props.onRedirect();
      }
    }
  
    render() {
        return (
          <div className="page-container">
            <div className="navbarHeader">
            <Header/>
            </div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={LogIn} />
                <Route path="/register" component={Register} />
                <Route path="/about" component={AboutUs} />
                <Route path="/calender" component={Calender} />
                <Route path="/contact" component={Contact} />
                <Route path="/store" component={Store} />
                <Route path="/join" component={JoinUs} />

              </Switch>
              <Footer/>
          </div>
        );
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);
