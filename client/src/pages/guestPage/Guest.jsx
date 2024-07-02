import React, { useEffect } from "react";
import "./guest.scss";
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../../assets/LG.jpeg';
import heroImg02 from '../../assets/Drake.jpeg';
import heroVideo from '../../assets/rihanna.jpeg';
import TS from "../../assets/TS.jpeg";
import AG from "../../assets/AG.webp";
import P from "../../assets/posty.jpeg";
import NM from "../../assets/NM.jpeg";
import experienceImg from '../../assets/Celebs.webp';
import Subtitle from "../../shared/Subtitle";
import ServiceList from "../../services/ServiceList";
import NewsLetter from "../../shared/Newsletter";
import { useLocation, useNavigate } from "react-router-dom";

const Guest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const role = location.state?.role || 'guest';

    const handleVisitClick = () => {
        if (role === 'guest') {
            navigate('/register');
        } else {
            // Handle regular visit logic here if necessary
        }
    };

    return (
        <>
            {/*========== hero section start =============*/}
            <section>
                <Container>
                    <Row lg='12'>
                        <Col lg='6'>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={'The art of streaming'} />
                                </div>
                                <h1>Stream your favorite artists, right here on <span className="highlight">Euphonic</span></h1>
                                <p>Euphonic is an innovative music platform that presents a unique combination of premium content and interactive features, making Euphonic the ideal place for all music lovers.</p>
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box">
                                <img src={heroImg} alt="" />
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-4">
                                <img src={heroVideo} alt="" />
                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*========== hero section end =============*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='3'>
                            <h5 className="services__subtitle">What we serve</h5>
                            <h2 className="services__title">We offer our best services</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row className="d-flex justify-content-around">
                        <Col lg='12' className="mb-5">
                            <Subtitle subtitle={'Explore'} />
                            <h2 className="featured__tour-title"> Our featured artists</h2>
                        </Col>
                        {[
                            { title: "Taylor Swift", img: TS, rating: 4.8, reviews: 2 },
                            { title: "Post Malone", img: P, rating: 4.6, reviews: 1 },
                            { title: "Ariana Grande", img: AG, rating: 4.7, reviews: 3 },
                            { title: "Nicki Minaj", img: NM, rating: 4.5, reviews: 1 }
                        ].map((artist, index) => (
                            <Col lg='3' key={index} className="mb-4">
                                <div className="card">
                                    <img src={artist.img} alt={artist.title} className="card-img-top" />
                                    <div className="card-body">
                                        <div className="rating">
                                            {artist.rating} ({artist.reviews})
                                        </div>
                                        <h5 className="card-title">{artist.title}</h5>
                                        <button className="btn btn-primary" onClick={handleVisitClick}>Visit</button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            {/*============ experience section start =============*/}
            <section>
                <Container>
                    <Row>
                        <Col lg='6'>
                            <div className="experience__content">
                                <Subtitle subtitle={'Experience'} />
                                <h2>With our all experience <br /> we will serve you</h2>
                                <p>Experience unparalleled music streaming with Euphonic. Enjoy personalized playlists, artist engagement, and seamless navigation—all at your fingertips </p>
                            </div>
                            <div className="counter_wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span>5M+</span>
                                    <h6>Pleased Users</h6>
                                </div>
                                <div className="counter__box">
                                    <span>1M+</span>
                                    <h6>Different songs</h6>
                                </div>
                                <div className="counter__box">
                                    <span>15</span>
                                    <h6>Years of experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className="experience__img">
                                <img src={experienceImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*============ experience section end =============*/}
            <NewsLetter />
        </>
    );
};

export default Guest;
