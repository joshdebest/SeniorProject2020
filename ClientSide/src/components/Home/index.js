import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultHome from './DefaultHome';
import { Carousel } from '../Carousel/Carousel';

const mapStateToProps = state => ({
   ...state.home
  // appName: state.common.appName,
   //token: state.common.token
 });
 
 const mapDispatchToProps = dispatch => ({
   onLoad: (tab, pager, payload) =>
     dispatch({ type: 'HOME_PAGE_LOADED', tab, pager, payload }),
   onUnload: () =>
     dispatch({  type: 'HOME_PAGE_UNLOADED' })
 });

class Home extends Component {
   componentWillMount() {
 
     this.props.onLoad();
   }
 
   componentWillUnmount() {
     this.props.onUnload();
   }
 
   render() {
     return (
       <div className="home-page">
 
         <Carousel/>
 
         <div className="container page">
           <div className="row">
             <DefaultHome/>
 
             <div className="col-md-3">

             </div>
           </div>
         </div>
 
       </div>
     );
   }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(Home);