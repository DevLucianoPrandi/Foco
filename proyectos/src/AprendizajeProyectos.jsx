import React from "react";
import './styles/App.css'
import { Row, Col } from "react-bootstrap"
import { useIdioma } from "./idioma/IdiomaContext";
import { Rich } from "./idioma/Rich";

const AprendizajeProyectos = () => {
    const { tr } = useIdioma();

    const pasos = [
        { titulo: "Identificar", clase: "abp-paso-1", texto: "un tema, un problema o una necesidad, una meta a ser alcanzada en su abordaje y un producto final que la concrete." },
        {
            titulo: "Diseñar", clase: "abp-paso-2", texto: "un plan de trabajo para alcanzar esa meta, lo que comprende:",
            lista: ["actividades y recursos (qué)", "responsables de cada tarea (quién)", "plazos (cuándo)"],
        },
        { titulo: "Desarrollar", clase: "abp-paso-3", texto: "en la práctica los pasos y actividades diseñados, considerando al plan como un marco que permite monitorear las acciones" },
        { titulo: "Presentar", clase: "abp-paso-4", texto: "el proceso y el resultado del proyecto a una audiencia y reflexionar sobre lo realizado (qué funcionó bien, qué se puede mejorar, qué se haría diferente)" },
    ];

    const beneficios = [
        "la **autodeterminación** y la **libertad de elección** por parte de los alumnos, ya sea del tema específico tratado, del producto a ser obtenido, de los roles grupales a ser desempeñados,",
        "el vínculo de los temas tratados en la escuela con **problemas reales** del contexto local o global,",
        "la **articulación** entre teoría y práctica,",
        "el desarrollo de un abanico de **habilidades**,",
        "el **trabajo en equipo**: la organización del grupo con distribución de tareas, responsabilidades y ejercicio de distintos roles,",
        "la incorporación de **enfoques interdisciplinarios**.",
    ];

    return (
        <section className="abp">
            <h2 className="abp-titulo">{tr("Aprendizaje basado en proyectos")}</h2>
            <p className="abp-intro">
                {tr("Propone a los alumnos la realización de una tarea vinculada con un tema o problema a lo largo de un período de tiempo, que desemboque en un producto y ofrezca la oportunidad de desplegar habilidades de autonomía y colaboración.")}
                <br />
                {tr("La propuesta supone:")}
            </p>

            <Row className="g-3 abp-pasos">
                {pasos.map((paso) => (
                    <Col key={paso.titulo} xs={12} md={6} lg={3}>
                        <div className={`abp-paso ${paso.clase}`}>
                            <h3 className="abp-paso-titulo">{tr(paso.titulo)}</h3>
                            <p>{tr(paso.texto)}</p>
                            {paso.lista && (
                                <ul className="abp-paso-lista">
                                    {paso.lista.map((item) => <li key={item}>{tr(item)}</li>)}
                                </ul>
                            )}
                        </div>
                    </Col>
                ))}
            </Row>

            <p className="abp-subtitulo">{tr("El proyecto como estrategia de enseñanza favorece particularmente:")}</p>
            <ul className="abp-beneficios">
                {beneficios.map((texto) => <li key={texto}><Rich>{tr(texto)}</Rich></li>)}
            </ul>
        </section>
    );
}

export { AprendizajeProyectos }
