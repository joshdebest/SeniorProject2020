import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultHome from './DefaultHome';
import {Carousel} from 'react-bootstrap';

const mapStateToProps = state => ({
   ...state.home
  // appName: state.common.appName,
   //token: state.common.token
 });

const imgUrls = [
	"https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900",
	"../../public/images/DeBestRoboticsLogo.png", 
	"https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328",
	"https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg",
	"https://ehealthforum.com/health/images/avatars/11699147425707699031013.jpeg"
];


export default class Home extends Component {
  constructor(props) {
    super(props)
  }
 
   render() {
     console.log("Rendering Home");
     return (
       <div className="home-page">
        
        <Carousel>
  				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg"
            alt="First slide"
            style={{width: 100, height: 500}}
					/>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900"
              alt="Secind slide"
              style={{width: 100, height: 500}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328"
              alt="Third slide"
              style={{width: 100, height: 500}}
            />
				  </Carousel.Item>
				</Carousel>

        <DefaultHome/>
       </div>
     );
   }
 }
 
 //export default connect(mapStateToProps, mapDispatchToProps)(Home);