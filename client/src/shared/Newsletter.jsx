import React from "react";
import './newsletter.css';

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/male-tourist.png"

const NewsLetter = () =>{
    return <section className="newsletter">
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="newsletter__content">
                        <h2>Subscribe now to get best music updates.</h2>

                        <div className="newsletter__input">
                            <input type="email" placeholder="Enter your email address"/>
                            <button className="btn newsletter__btn">Subscribe</button>
                        </div>

                        <p>Subscribe to enjoy our platform and to get the full experience! Interacting with your favorite artists has never been easier!</p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
}

export default NewsLetter