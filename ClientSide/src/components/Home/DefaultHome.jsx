import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
   ...state.home
  // tags: state.home.tags,
  // token: state.home.token
 });
 
 const mapDispatchToProps = dispatch => ({
   onTabClick: (tab, pager, payload) => dispatch({ type: 'CHANGE_TAB', tab, pager, payload })
 });
 
 const DefaultHome = () => {
   return (
     <div className="col-md-9">
       <div className="feed-toggle">
         <ul className="nav nav-pills outline-active">
 
         <h1>ABOUT US</h1>
         <p>DeBest robotics is a robotics program associated with the Pegasus School in Huntington Beach, CA.  
            We are teaching young minds the keys to solving problems and how to work with a team to reach a common goal.</p>

 
         </ul>
       </div>

     </div>
   );
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(DefaultHome);