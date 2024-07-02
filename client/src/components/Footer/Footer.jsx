import React from "react";
import './footer.css';

import {Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap";

import {Link} from "react-router-dom";

const quick__links =[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About',
    },
    {
        path:'/tours',
        display:'Tours',
    },
]

const quick__links2 =[
    {
        path:'/gallery',
        display:'Gallery'
    },
    {
        path:'/login',
        display:'Login',
    },
    {
        path:'/register',
        display:'Register'
    },
]



const Footer = () =>{

    const year = new Date().getFullYear()

    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="3">
                    <div className="logo">
                        
                        <p></p>

                        <div className="social__links d-flex align-items-center gap-4">
                            <span>
                                <Link to='#'> YouTube</Link>
                            </span>
                            <span>
                                <Link to='#'> Github</Link>
                            </span>
                            <span>
                                <Link to='#'> Facebook</Link>
                            </span>
                            <span>
                                <Link to='#'> Instagram</Link>
                            </span>

                        </div>
                    </div>
                </Col>

                <Col lg='3'>
                    <h5 className="footer__link-title">Discover</h5>

                    <ListGroup className="footer__quick-links">
                        {
                            quick__links.map((item, index)=>(
                                <ListGroupItem key={index}className="ps-0 border-0">
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))
                        }

                    </ListGroup>
                </Col>
                <Col lg='3'>
                <h5 className="footer__link-title">Quick links</h5>

<ListGroup className="footer__quick-links">
    {
        quick__links2.map((item, index)=>(
            <ListGroupItem key={index}className="ps-0 border-0">
                <Link to={item.path}>{item.display}</Link>
            </ListGroupItem>
        ))
    }

</ListGroup>
                </Col>
                <Col lg='3'>
                <h5 className="footer__link-title">Contact</h5>

        <ListGroup className="footer__quick-links">
    
       {/*
            <ListGroupItem key={index} className="ps-0 border-0 d-flex align-items-center gap-3">
               <h6 className="mb-0 d-flex align-items-center gap-2">
                    Address:
               </h6>

               <p className="mb-0">Syhlet, Bangladesh</p>
            </ListGroupItem>

*/ }

        </ListGroup>
                </Col>

                <Col lg='12' className="text-center pt-5">
                <p className="copyright">Copyright {year}, design and develop by Eric Udiljak. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
}

export default Footer