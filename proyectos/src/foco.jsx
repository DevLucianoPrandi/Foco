import React from "react";
import './styles/App.css'
import { Container, Row, Col, Card } from "react-bootstrap"
import Luciano from './assets/img/79985-Prandi.jpg';
import Andrea from './assets/img/15395-Kunz.jpg';
import Sabrina from './assets/img/75722-Masini2.jpg';
import { useIdioma } from './idioma/IdiomaContext'

const Foco = () => {
    const { tr } = useIdioma();

    return (
        <Container fluid style={{ maxWidth: '1400px' }} >
            <Row className="mx-5">
                <h1 style={{ color: "#00618b", marginBottom: "1rem", textAlign: "center" }}>{tr("Fortalecer a los estudiantes a través del trabajo con proyectos en el Colegio Pestalozzi")}</h1>
                <h3 style={{ color: "#d8972f", marginTop: "2rem" }}>{tr("Mirada y equipo de trabajo:")}</h3>

                <p>{tr("El Aprendizaje Basado en Proyectos (ABP) es una estrategia de enseñanza que promueve el trabajo autónomo, participativo y el saber colectivo. Por lo tanto, debe surgir de una verdadera pregunta sobre el mundo para fomentar la curiosidad, estimular la reflexión, el trabajo activo y el surgimiento de aprendizajes significativos con el fin de que los estudiantes desarrollen habilidades de indagación como un medio para lograr el fortalecimiento de su autonomía.")}<br /><br />{tr('El "Foco Proyectos" en el Colegio Pestalozzi desempeña un papel crucial en la implementación y desarrollo de iniciativas pedagógicas innovadoras a lo largo de todos los niveles educativos: inicial, primario y secundario. Este equipo multidisciplinario trabaja arduamente para fomentar la creatividad, la colaboración y la mejora continua en el ámbito educativo.')}<br /></p>

                <h3 style={{ color: "#d8972f", marginBottom: "1rem" }}>{tr("Función del Foco:")}</h3>

                <p>{tr('El "Foco Proyectos" tiene como objetivo principal catalizar y apoyar la ejecución de proyectos educativos que enriquezcan la experiencia de aprendizaje de nuestros estudiantes. Esto implica la identificación de oportunidades, la facilitación de recursos y la creación de un entorno propicio para la innovación pedagógica. Además, el Foco Proyectos se esfuerza por alinear estas iniciativas con los objetivos más amplios del Programa de Mejora Pedagógica (PQM) del colegio.')}<br /></p>


                <h3 style={{ color: "#d8972f", marginBottom: "1rem" }}>{tr("Integrantes del Foco Proyectos:")}</h3>
                <Row xs={1} md={2} className="g-4">

                    <Card className="integrante" style={{ width: "14rem" }} >
                        <Col><Card.Img variant="top" src={Luciano} className="mb-3 p-4" /><h5 style={{ color: "#00618b" }}>Luciano Prandi</h5>  <b>{tr("Coordinador del Foco y representante del Nivel Secundario")}</b> <p style={{ marginTop: "1rem" }}>{tr("Como coordinador del Foco Proyectos, Luciano desempeña un papel fundamental en la planificación estratégica de proyectos en los tres niveles.")}</p></Col>
                    </Card>

                    <Card className="integrante" style={{ width: "14rem" }}>
                        <Col><Card.Img variant="top" src={Andrea} className="mb-3 p-4" /><h5 style={{ color: "#00618b" }}>Andrea Kunz</h5> <b>{tr("Representante del Nivel Primario")}</b> <p style={{ marginTop: "1rem" }}>{tr("Andrea aporta su conocimiento y experiencia específicos del nivel primario, asegurando que las iniciativas del Foco Proyectos aborden las necesidades particulares de los estudiantes en esta etapa crucial de su educación.")}</p></Col>
                    </Card>

                    <Card className="integrante" style={{ width: "14rem" }}>
                        <Col><Card.Img variant="top" src={Sabrina} className="mb-3 p-4" /><h5 style={{ color: "#00618b" }}>Sabrina Masini</h5> <b>{tr("Representante del Nivel Inicial")}</b> <p style={{ marginTop: "1rem" }}>{tr("Sabrina, como representante del nivel inicial, aporta una valiosa visión centrada en las necesidades y características únicas de los más pequeños en nuestra comunidad educativa.")}</p></Col>
                    </Card>

                    <Card className="integrante" style={{ width: "14rem" }}>
                        <Col><h1 style={{ color: "#00618b", marginTop:"3rem", marginBottom:"2rem", textAlign:"center" }}>{tr("Comisión Directiva")} <br /></h1><h5 style={{ color: "#00618b" }}> <br /> Alejandro Zold <br /> Carolina Riemann</h5><b>{tr("Representante de la Comisión Directiva")}</b> <p style={{ marginTop: "1rem" }}>{tr("El Foco cuenta además con el apoyo y la participación de Alejandro y Carolina como representantes de la Comisión Directiva del colegio.")}</p></Col>
                    </Card>
                </Row>
            </Row>
        </Container >

    );
}

export { Foco }
