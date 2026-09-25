import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { saveProyectos } from '../services/servProyectos'
import { useNavigate } from 'react-router-dom';

const renderCheckboxes = (name, options, formik) => {
    return options.map((option) => (
        <Form.Check
            key={option}
            type="checkbox"
            value={option}
            name={name}
            label={option}
            checked={formik.values[name].includes(option)}
            onChange={(e) => {
                formik.setFieldValue(
                    name,
                    e.target.checked
                        ? [...formik.values[name], e.target.value]
                        : formik.values[name].filter((value) => value !== e.target.value)
                );
            }}
        />
    ));
};

function Secundaria() {

    const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const allowedDocumentExtensions = ['pdf'];
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: "",
            nivel: "Secundaria",
            imagen: [],
            anho: [],
            otroNivel: "",
            nivelInvolucrado: [],
            objetivoGeneral: "",
            descripcion: "",
            docenteReferente: "",
            materias: [],
            otroAreas: "",
            contenidosArticulacion: "",
            cronograma: [],
            otroCronograma: "",
            evaluacion: "",
            materiales: [],
            otrosMateriales: "",
            planificacion: [],
            producciones: [],
            otrosProducciones: "",
            comentarios: "",
        },

        onSubmit: async (values, { setSubmitting }) => {
            const datosProyecto = new FormData();
            console.log('Datos enviados al servidor:', values);

            const appendToFormData = (key, value) => {
                if (Array.isArray(value) && value.length > 0) {
                    value.forEach((item) => {
                        datosProyecto.append(key, item);
                    });
                } else if (!Array.isArray(value) && value !== "") {
                    datosProyecto.append(key, value);
                }
            };

            Object.entries(values).forEach(([key, value]) => {
                appendToFormData(key, value);
            });

            try {
                const response = await saveProyectos(datosProyecto);
                if (response && response.data) {
                    console.log(response.data);
                    setShowModal(true);
                } else {
                    console.log('No se devolvieron datos desde el servidor');
                }
            } catch (error) {
                console.error('Error al guardar el proyecto:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const materiasOptions = [
        "Lengua",
        "Matemática",
        "Ciencias sociales",
        "Ciencias sociales: Historia",
        "Ciencias sociales: Geografia",
        "Alemán",
        "Inglés",
        "ESI",
        "Ética",
        "Ciencias Naturales",
        "Física",
        "Química",
        "Biologie (D)",
        "Geschichte (D)",
        "Geografie (D)",
        "Filosofía",
        "Economía",
        "MINT",
        "Geografía",
        "Historia",
        "Educación física",
        "Biología",
        "Tecnología",
        "Portugués",
        "PAS",
        "Arte",
        "Cultura",
        "Proyecto",
    ];

    const cronogramaOptions = [
        "mensual",
        "bimestral",
        "cuatrimestral",
        "anual"
    ]

    const [files, setFiles] = useState([]);

    const handleMaterialesChange = (event) => {
        const files = Array.from(event.target.files);
        setFiles(files);
        formik.setFieldValue('materiales', files);
    };

    const handlePlanificacionChange = (event) => {
        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedDocumentExtensions.includes(fileExtension)) {
            alert('Por favor, selecciona un archivo PDF.');
            event.target.value = null;
            return;
        }

        setFiles([file]);
        formik.setFieldValue('planificacion', [file]);
    };

    const handleImagenChange = (event) => {
        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedImageExtensions.includes(fileExtension)) {
            alert('Por favor, selecciona un archivo de imagen válido (jpg, jpeg, png, webp).');
            event.target.value = null;
            return;
        }

        setFiles([file]);
        formik.setFieldValue('imagen', [file]);
    };

    const handleProduccionesChange = (event) => {
        const files = Array.from(event.target.files);
        setFiles(files);
        formik.setFieldValue('producciones', files);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/proyectos');
    };

    return (
        <Container fluid style={{ maxWidth: '1400px' }}>
            <Row className="mx-5">
                <Col className=" justify-content-center">
                    <h3 style={{ color: "#d8972f", marginBottom: "1rem" }}>Registro de Proyectos - Nivel Secundario</h3>
                    <p>Los proyectos que se registren en este formulario formarán parte del "Currículum vinculante de proyectos" del Colegio Pestalozzi.
                        En caso de tener alguna consulta, podés acercarte al referente del foco proyectos de tu nivel:<br /></p>
                    <p><span style={{ fontWeight: "600" }}>Nivel Secundario:</span> Luciano Prandi <br /></p>

                    <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>¡Muchas gracias por tu colaboración!</p>
                </Col>
            </Row>
            <Row className="formCarga">
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Nombre del proyecto</Form.Label>
                        <Form.Control
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Con este nombre se presentará el proyecto y se podrá también buscar en el repositorio.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Imagen de presentación</Form.Label>
                        <Form.Control
                            type="file"
                            id="imagen"
                            name="imagen"
                            onChange={handleImagenChange}
                        />
                        <Form.Text>
                        Seleccioná un archivo en formato JPG, JPEG, PNG o WEBP
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Años</Form.Label>
                        {renderCheckboxes("anho", ["Primer año", "Segundo año", "Tercer año", "Cuarto año", "Quinto año", "Sexto año"], formik)}

                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Nivel involucrado</Form.Label>
                        {renderCheckboxes("nivelInvolucrado", ["Inicial", "Primaria"], formik)}

                        <Form.Control
                            type="text"
                            id="otroNivel"
                            name="otroNivel"
                            value={formik.values.otroNivel}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Por favor, ingresá que grado(s) o año(s) está(n) involucrado(s) en el proyecto
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Objetivo(s) general(es)</Form.Label>
                        <Form.Control
                            type="text"
                            id="objetivoGeneral"
                            name="objetivoGeneral"
                            onChange={formik.handleChange}
                        />

                        <Form.Text>
                            ¿Cuál es el objetivo global para este proyecto?  (Se refiere al meta-objetivo, a lo que el proyecto por sí solo no puede llegar, pero contribuirá. Es recomendable que sea redactado en una sola oración y no cuente con más de dos renglones de extensión. Es general y poco específico).
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="descripcion"
                            name="descripcion"
                            value={formik.values.descripcion}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Describí el proyecto lo más detallado posible en cuanto a cómo surgió, a que objetivos de aprendizaje responde, el porqué de la temática elegida.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Docente referente</Form.Label>
                        <Form.Control
                            type="text"
                            id="docenteReferente"
                            name="docenteReferente"
                            value={formik.values.docenteReferente}
                            onChange={formik.handleChange}
                        />

                        <Form.Text>
                            Es interesante saber quién desarrollo y llevó a cabo el proyecto para lograr intercambio de experiencias e ideas.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Materias involucradas en el proyecto</Form.Label>
                        {renderCheckboxes("materias", materiasOptions, formik)}

                        <Form.Control
                            type="text"
                            id="otroAreas"
                            name="otroAreas"
                            value={formik.values.otroAreas}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Otro área involucrada que no figura en la lista...
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Contenidos de articulación</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="contenidosArticulacion"
                            name="contenidosArticulacion"
                            value={formik.values.contenidosArticulacion}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            ¿Qué actividad(es) se realiz(ó)aron en otra(s) área(s) para contribuir al proyecto?.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Evaluación</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="evaluacion"
                            name="evaluacion"
                            value={formik.values.evaluacion}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            ¿Qué estrategias de evaluación se utilizarán para recoger información válida y confiable sobre el progreso de los alumnos?
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Materiales</Form.Label>
                        <Form.Control
                            type="file"
                            id="materiales"
                            name="materiales"
                            multiple
                            onChange={handleMaterialesChange}
                        />
                        <Form.Text>
                            Selecciona los materiales necesarios para el proyecto.
                        </Form.Text>

                        <Form.Control className='mt-3'
                            type="text"
                            id="otrosMateriales"
                            name="otrosMateriales"
                            value={formik.values.otrosMateriales}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Acá podés agregar links o comentarios.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Cronograma</Form.Label>
                        {renderCheckboxes("cronograma", cronogramaOptions, formik)}

                        <Form.Control
                            type="text"
                            id="otroCronograma"
                            name="otroCronograma"
                            value={formik.values.otroCronograma}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Otro área involucrada que no figura en la lista...
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Planificación</Form.Label>
                        <Form.Control
                            type="file"
                            id="planificacion"
                            name="planificacion"
                            onChange={handlePlanificacionChange}
                        />
                        <Form.Text>
                            Seleccioná un archivo en formato PDF
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Producciones</Form.Label>
                        <Form.Control
                            type="file"
                            id="producciones"
                            name="producciones"
                            multiple
                            onChange={handleProduccionesChange}
                        />
                        <Form.Text>
                            Cargá productos finales de tu proyecto.
                        </Form.Text>

                        <Form.Control className='mt-3'
                            type="text"
                            id="otrosProducciones"
                            name="otrosProducciones"
                            value={formik.values.otrosProducciones}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Acá podés agregar links o comentarios.
                        </Form.Text>
                        <hr />

                        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>Comentarios</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="comentarios"
                            name="comentarios"
                            value={formik.values.comentarios}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            Escribe aquí comentarios adicionales sobre el proyecto.
                        </Form.Text>
                        <hr />

                        <Button variant="primary" type="submit" onClick={formik.handleSubmit} className='pb-2'>
                            Enviar
                        </Button>

                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Formulario enviado</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>El proyecto se guardó con éxito. ¡Muchas gracias!</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleCloseModal}>
                                    Aceptar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <hr />
                        <p style={{ fontSize: "1.8rem", fontWeight: "600", color: "#00618b", marginTop: "2rem" }}>¡Muchas gracias por tu participación!</p>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export { Secundaria }