import React from "react";
import '../styles/App.css'
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";
import LogoCom from "../assets/img/logo_comunidad.png";
import Casa from "../assets/img/casaw.png";
import Letra from "../assets/img/letraw.png";
import Pqm from "../assets/img/PQMw.png";
import { BotonIdioma } from "./BotonIdioma";
import { useIdioma } from "../idioma/IdiomaContext";

function Footer() {
    const { tr } = useIdioma();

    return (
        <Container className="footer" fluid>
            <Row className="justify-content-center py-5" fluid>
                <Col xs="12" md="auto" lg="2" >
                    <Link to='/' className="link">{tr("Home")} <img src={Casa} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <Link to='https://www.pestalozzi.edu.ar/es/institucional/gestion-de-calidad-pedagogica-pqm/integrantes-de-pqm.html' target="_blank" rel="noopener noreferrer" className="link">PQM<img src={Pqm} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <Link to='/contacto' className="link">{tr("Contacto")}<img src={Letra} style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }}></img></Link><br />
                    <BotonIdioma className="link" tamano={14} lado="derecha" />
                </Col>
                <Col xs="12" md="auto" lg="auto" className="justify-content-center" >
                    <div className="logoCom"><img src={LogoCom} alt="Comunidad Pestalozzi" /></div>
                </Col>

                <Col xs="12" md="auto" lg="auto" className="justify-content-end" >
                    <p style={{ color: "white", paddingLeft:" 10rem" }}>Colegio Pestalozzi<br />
                        Ramón Freire 1882<br />
                        1428 Buenos Aires<br />
                        {tr("Argentina")}</p>
                </Col>
            </Row>
        </Container>

    );
}

export { Footer }
