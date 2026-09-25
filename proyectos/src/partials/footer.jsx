import React from "react";
import '../styles/App.css'
import { Container, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import LogoCom from "../assets/img/logo_comunidad.png";
import Casa from "../assets/img/casaw.png";
import Letra from "../assets/img/letraw.png";
import Pqm from "../assets/img/PQMw.png";
import Deutsch from "../assets/img/alemania.png";

function Footer() {
    return (
        <Container className="footer" fluid>
            <Row className="justify-content-center py-5" fluid>
                <Col xs="12" md="auto" lg="2" >
                    <Link to='/' className="link">Home <img src={Casa} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <Link to='/' className="link">PQM<img src={Pqm} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <Link to='/' className="link">Contacto<img src={Letra} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <Link to='/' className="link">Deutsch<img src={Deutsch} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link>
                </Col>
                <Col xs="12" md="auto" lg="auto" className="justify-content-center" >
                    <div className="logoCom"><img src={LogoCom} alt="Comunidad Pestalozzi" fluid /></div>
                </Col>
                
                <Col xs="12" md="auto" lg="auto" className="justify-content-end" >
                    <p style={{ color: "white", paddingLeft:" 10rem" }}>Colegio Pestalozzi<br />
                        Ramón Freire 1882<br />
                        1428 Buenos Aires<br />
                        Argentina</p>
                </Col>
            </Row>
        </Container>

    );
}

export { Footer }