import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, LinkContainer, Button} from 'react-bootstrap';

const mapStateToProps = state => ({
   ...state.home
 });
 
 const mapDispatchToProps = dispatch => ({
   onTabClick: (tab, pager, payload) => dispatch({ type: 'CHANGE_TAB', tab, pager, payload })
 });
 
 const DefaultHome = () => {
   return (
    <div style={{width: '100%'}}>           

          <h1 style={{paddingTop: '75px', fontSize: '160%', fontWeight: 'normal'}}>We are DeBest Robotics, an afterschool robotics team</h1>
          <h1 style={{paddingTop: '15px', fontSize: '160%', fontWeight: 'normal'}}>at The Pegasus School in Huntington Beach, CA</h1>

          <p style={{paddingTop: '40px', fontSize: '125%', fontWeight: 'lighter'}}>
          Through cross-discipline teamwork and passion, students have the opportunity to get involved 
           </p>
          <p style={{fontSize: '125%', fontWeight: 'lighter'}}>
          in STEM fields while fostering a collaborative environment.
           </p>

          <a href="/join" class="btn btn-info" role="button" 
              style={{position: 'relative', top:'50%', left:'50%', transform: 'translate(-50%,-50%)', marginTop:'50px'}}>
              Join Today
          </a>

          <hr style={{border: '1px solid black', marginTop:'100px', marginBottom:'50px'}}></hr>

          <Row style={{marginTop: '50px'}}>
               <Col sm={4}>
                  <p>We are DeBest Robotics, an afterschool program dedicated to
                     teaching young students about robotics while emphasizing the 
                     importantance of collaboration and hard work.
                  </p>
               </Col>
               <Col sm={8}>
                  <img src={process.env.PUBLIC_URL + '/images/Homepage.jpeg'} 
                   style={{height: '85%', width: '95%'}}/>
               </Col>
            </Row>

            <Row className="secondRow">
               <Col sm={8}>
                  <img src={process.env.PUBLIC_URL + '/images/Resources.jpeg'} 
                      style={{height: '90%', width: '90%'}}
                  />
               </Col>
               <Col sm={4}>
                  <p>
                  DeBest robotics compete in tournaments hosted by Vex Robotics. Under strict rules the students will design, program,
                  and engineer robots to complete unique challenges.  Our teams compete in regional and state tournaments around California.
                  </p>
               </Col>
            </Row>
      </div>
   );
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(DefaultHome);