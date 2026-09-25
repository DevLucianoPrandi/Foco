import React from "react";
import './styles/App.css'
import { Container, Row, Col, Image } from "react-bootstrap"
import Home1 from './assets/img/home1.png'
import Home2 from './assets/img/home2.png'
import Home3 from './assets/img/home3.png'
import { AprendizajeProyectos } from './AprendizajeProyectos'
import { useIdioma } from './idioma/IdiomaContext'

const Home = () => {
    const { tr } = useIdioma();
    const images = [Home1, Home2, Home3];

    const ImagenesDesprolijas = () => {
        const rotateDegrees = [-10, 3, 12];

        return (
            <Row className="my-5">
                {images.map((image, index) => (
                    <Col key={index} className="d-flex align-items-center justify-content-center">
                        <Image
                            src={image}
                            style={{
                                transform: `rotate(${rotateDegrees[index]}deg)`,
                                margin: '10px',
                                marginTop: index === 1 ? '-100px' : '0',
                            }}
                            width={380}
                            height={380}
                            rounded
                        />
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <Container fluid style={{ maxWidth: '80rem' }}>
            <Row className="mx-5">
                <Col className=" justify-content-center">
                    <h1 style={{ color: "#00618b", textAlign: "center", marginBottom: "3rem" }}>{tr("Fortalecer a los estudiantes a través del trabajo con proyectos en el Colegio Pestalozzi")}</h1>
                    <h3 style={{ color: "#d8972f" }}>{tr("¡Bienvenidos, estimados docentes del Colegio Pestalozzi!")}</h3>

                    <p>{tr("Es un placer darles la más cordial bienvenida a nuestra plataforma interna, destinada a la carga de proyectos que se llevarán a cabo a lo largo del año en los tres ciclos: inicial, primaria y secundaria. Esta iniciativa se enmarca dentro del Foco Proyectos del Programa de Mejora Pedagógica (PQM), reflejo de nuestro compromiso constante con la excelencia educativa y la innovación en el proceso de enseñanza-aprendizaje.")}<br /></p>

                    <p>{tr("En esta plataforma, encontrarán un espacio diseñado para facilitar la gestión y seguimiento de los proyectos que contribuyen al enriquecimiento de la experiencia educativa en cada ciclo. Nos emociona la oportunidad de explorar nuevas ideas, métodos y enfoques pedagógicos que fortalezcan la calidad de la educación que ofrecemos.")}<br /></p>

                    <p>{tr("Les animamos a aprovechar al máximo esta herramienta, cargando sus proyectos con entusiasmo y creatividad. Este espacio no solo facilitará la organización y colaboración entre los equipos de trabajo, sino que también permitirá compartir buenas prácticas, fomentando un intercambio fructífero de conocimientos.")}<br /></p>

                    <p>{tr("Agradecemos su dedicación y contribución al desarrollo integral de nuestros estudiantes. Juntos, trabajaremos para impulsar la innovación y la mejora continua en nuestro proceso educativo. Siempre estamos abiertos a sugerencias y comentarios para seguir mejorando.")}<br /></p>

                    <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b", marginBottom: "3rem" }}>{tr("¡Que este espacio sea un reflejo de la colaboración y el compromiso que caracterizan a nuestra comunidad educativa en el Colegio Pestalozzi!")}</p>
                </Col>

            </Row>
            <Row className="mx-md-5">
                <Col>
                    <AprendizajeProyectos />
                </Col>
            </Row>

            <ImagenesDesprolijas />
        </Container>

    );
}

export { Home }
