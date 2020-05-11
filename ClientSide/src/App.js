import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions/actions';
import Home from './components/Home/Home';

function mapStateToProps(state){
    console.log("State is " + JSON.stringify(state));
    return {
        Users: state.Users,
        Errs: state.Errs
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export default App;