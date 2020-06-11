import React, { Component } from 'react';
import DefaultHome from './DefaultHome';
import {Carousel, Row} from 'react-bootstrap';
import './Home.css';

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
            src={process.env.PUBLIC_URL + '/images/JoinUs.jpeg'}            
            alt="First slide"
            style={{width: 100, height: 500, opacity: 0.75}}
					/>
          <Row className="center_txt">DeBest Robotics</Row>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + '/images/Carousel2.jpeg'}            
              alt="Secind slide"
              style={{width: 100, height: 500, opacity: 0.75}}
            />
            <Row className="center_txt">DeBest Robotics</Row>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + '/images/Carousel3.jpeg'}            
              alt="Third slide"
              style={{width: 100, height: 500, opacity: 0.75}}
            />
            <Row className="center_txt">DeBest Robotics</Row>
				  </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + '/images/Carousel4.jpeg'}            
              alt="Third slide"
              style={{width: 100, height: 500, opacity: 0.75}}
            />
            <Row className="center_txt">DeBest Robotics</Row>
				  </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + '/images/Carousel5.jpeg'}            
              alt="Third slide"
              style={{width: 100, height: 500, opacity: 0.75}}
            />
            <Row className="center_txt">DeBest Robotics</Row>
				  </Carousel.Item>
				</Carousel>

        <DefaultHome/>
       </div>
     );
   }
 }
 