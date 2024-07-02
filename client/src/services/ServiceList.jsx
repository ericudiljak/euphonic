import React from "react";
import ServiceCard from "./ServiceCard";
import {Col} from "reactstrap";

import weatherImg from './../assets/weather.png'
import guideImg from './../assets/guide.png'
import customizationImg from './../assets/customization.png'


const servicesData =[
    {
        imgUrl: weatherImg,
        title: "Best music experience",
        description: "Discover, stream, and share your favorite tracks effortlessly.",
    },
    {
        imgUrl: guideImg,
        title: "Personalized playlists",
        description: "We offer top-notch streaming with an intuitive interface" ,
    },
    {
        imgUrl: customizationImg,
        title: "Artist interactions",
        description: "Interacting has never been easer with celebrities",
    },
]

const ServiceList = () =>{
    return (
    <>
        {servicesData.map((item,index) => (
            <Col lg="3" key={index}>
                <ServiceCard item={item}/>
            </Col>)
    )}
    </>
    );
}

export default ServiceList;