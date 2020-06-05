import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as actionCreators from './redux/actionCreators';

import Home from './components/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import AboutUs from './components/Pages/AboutUs/AboutUs';
import Calendar from './components/Pages/Calendar/Calendar';
import Contact from './components/Pages/Contact/Contact';
import Store from './components/Pages/Store/Store';
import JoinUs from './components/Pages/JoinUs/JoinUs';
import './App.css'

class App extends Component {
    componentDidMount() {
        this.props.insertToken()
    }
    render() {
        return (
            <div className="page-container">
            <Header user_token={this.props.user_token}/>
            <main role='main' className='flex-shrink-0'>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" 
                            render={() => <LogIn {...this.props} />} />
                        <Route path="/register" 
                            render={() => <Register {...this.props} />}/>
                        <Route path="/about" component={AboutUs} />
                        <Route path="/calender" component={Calendar} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/store" component={Store} />
                        <Route path="/join" component={JoinUs} />

                    </Switch>
                </div>
            </main>
            <Footer/>
            </div>
        );
    }
  }
const mapStateToProps = state => {
    return {
        Users: state.Users,
        Home: state.Home,
        Errs: state.Errs,
        Token: state.Token,
        currImgIndex: 0
    }};
  
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
