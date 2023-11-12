import React from "react";
import '../styles/App.css'
import { Container, Row, Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom";
import Logo from "../assets/img/logopesta.png"

function NavBar() {
    return (
        <Container fluid>

            {/* LOGO */}
            <Row className="mt-2 mx-5">
                <Col xs={12} md={2} className="mt-3">
                    <Link to="/" className="text-light">
                        <Image src={Logo} alt="logo" className="img-thumbnail border-0 p-1 d-flex" fluid />
                    </Link>
                </Col>

                {/* buscador */}
                <Col xs={12} md={8} className="mt-4">
                    <div className="input-wrapper">
                        <input type="search" placeholder="¿Que estas buscando?" className="buscador py-2 me-2 ps-3 rounded-pill" />
                        <button type="button" className="btn btn-outline-secondary rounded-pill boton">Buscar</button>
                    </div>
                </Col>
            </Row>

            {/* Links de Navbar */}
            <Row className="justify-content-md-center mt-3">
                <Col xs="12" md="auto"><Link to='/' className="link">El foco</Link></Col>
                <Col xs="12" md="auto"><Link to='/' className="link">Inicial</Link></Col>
                <Col xs="12" md="auto"><Link to='/' className="link">Primaria</Link></Col>
                <Col xs="12" md="auto"><Link to='/' className="link">Secundaria</Link></Col>
                <Col xs="12" md="auto"><Link to='/' className="link">Contacto</Link></Col>
            </Row>

        </Container>

    );
}

export { NavBar }