import React from "react";
import '../styles/App.css';
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logopesta.png";
import Casa from "../assets/img/casa.png";
import Letra from "../assets/img/letra.png";
import Pqm from "../assets/img/PQM.png";
import Deutsch from "../assets/img/alemania.png";

function NavBar() {
    return (
        <Container fluid >

            {/* LOGO */}
            <Row className="justify-content-center mt-3" fluid >
                <Col xs={12} md={2}>
                    <Link to="/" className="text-light">
                        <Image src={Logo} alt="logo" className="img-thumbnail border-0 p-1" fluid />
                    </Link>
                </Col>
<Col xs="12" md={3}></Col>
                {/* Barra superior */}

                <Col xs="12" md="auto" fluid>
                    <Link to='/' className="barraSup"><img src={Casa} style={{marginRight:"0.5rem", width: "28px", height: "28px" }}></img>Home</Link>
                    <Link to='https://www.pestalozzi.edu.ar/es/institucional/gestion-de-calidad-pedagogica-pqm/integrantes-de-pqm.html'  target="_blank" rel="noopener noreferrer" className="barraSup"><img src={Pqm} style={{marginRight:"0.5rem", width: "28px", height: "28px" }}></img>PQM</Link>
                    <Link to='/contacto' className="barraSup"><img src={Letra} style={{marginRight:"0.5rem", width: "28px", height: "28px" }}></img>Contacto</Link>
                    <Link to='/' className="barraSup"><img src={Deutsch} style={{marginRight:"0.5rem", width: "28px", height: "28px" }}></img>Deutsch</Link>
                </Col>
            </Row>

            {/* Links de Navbar */}
            <Row className="barraNav justify-content-md-center my-3" fluid>
                <Col xs="12" md="auto"><Link to='/foco' className="link">EL FOCO</Link></Col>
                <Col xs="12" md="auto"><Link to='/inicial' className="link">NIVEL INICIAL</Link></Col>
                <Col xs="12" md="auto"><Link to='/primaria' className="link">NIVEL PRIMARIO</Link></Col>
                <Col xs="12" md="auto"><Link to='/secundaria' className="link">NIVEL SECUNDARIO</Link></Col>
                <Col xs="12" md="auto"><Link to='/proyectos' className="link" style={{fontWeight:700}}>PROYECTOS</Link></Col>
            </Row>

        </Container>

    );
}

export { NavBar }