import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import { getProyectoUnico } from '../../services/servProyectos';
import { useParams } from 'react-router-dom';

const Mostrar = () => {
  const { _id } = useParams();
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    async function cargaProyecto() {
      try {
        const response = await getProyectoUnico(_id);
        if (response.status === 200) {
          setProyecto(response.data.proyecto);
          setLoading(false);
        } else {
          setError('Error cargando proyecto. Estado: ' + response.status);
          setLoading(false);
        }
      } catch (error) {
        setError('Error cargando proyecto. Por favor, inténtelo de nuevo más tarde.');
        setLoading(false);
      }
    }
    cargaProyecto();
  }, [_id]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const baseUrl = import.meta.env.VITE_APP_PUBLIC_STORAGE;
  const imageUrl = proyecto.imagen && proyecto.imagen.length > 0
    ? baseUrl + proyecto.imagen[0]
    : baseUrl + "imagen/default.jpg";

  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Row className='tarjetas pb-3 align-items-start'>
        <h1 className='titulo' style={{ fontSize: "1.8rem", fontWeight: "600", color: "#00618b", marginTop: "2rem", textAlign: "center" }}>{proyecto.nombre || '--'}</h1>
        {loading && <p>Cargando...</p>}
        {!loading && !error && (
          <Col key={proyecto._id}>
            <Card className="m-3">
              <Row className='align-items-start'>
                <Col md={5}>
                  {proyecto.imagen && (
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={proyecto.nombre}
                      className="img-fluid"
                      style={{ margin: "1rem", boxShadow: "2px 1px 12px grey" }}
                    />
                  )}
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold' }}>Nivel:</span> {proyecto.nivel}
                      {proyecto.nivel !== 'Secundaria' && (
                        <> - {(proyecto[proyecto.nivel && proyecto.nivel.toLowerCase() === 'inicial' ? 'salas' : 'grado'] || []).map((item, index) => (index === 0 ? item : item.toLowerCase())).join(', ') || '--'}</>
                      )}
                    </Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Docente referente del proyecto:</span> {proyecto.docenteReferente || '--'}</Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold' }}>Otro(s) nivel(es) involucrado(s):</span> {proyecto.nivelInvolucrado || '--'} - {proyecto.otroNivel}
                    </Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Objetivo del proyecto:</span> {proyecto.objetivoGeneral || '--'}</Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Descripción del proyecto:</span> {proyecto.descripcion || '--'}</Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold' }}>{proyecto.nivel === 'Inicial' ? 'Áreas' : 'Materias'} relacionadas con el proyecto:</span> {proyecto.nivel === 'Inicial' ? (proyecto.areas || []).join(', ') || '--' : (proyecto.materias || []).join(', ') || '--'}
                    </Card.Text>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold' }}>Otras áreas/materias relacionadas con el proyecto:</span>
                      {proyecto.nivel === 'Inicial'
                        ? proyecto.otroAreas || ' --'
                        : proyecto.nivel === 'Primaria'
                          ? proyecto.otroMaterias || ' --'
                          : proyecto.nivel === 'Secundaria'
                            ? proyecto.otroMaterias || ' --'
                            : proyecto.areas.join(', ')}
                    </Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Contenidos trabajados en otras materias o niveles para llevar a cabo el proyecto:</span> {proyecto.contenidosArticulacion || '--'}</Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Materiales utilizados para el proyecto:</span> {proyecto.otrosMateriales || '--'}</Card.Text>

                    {proyecto.nivel === 'Secundaria' && (
                      <Card.Text>
                        <span style={{ fontWeight: 'bold' }}>Secuencia de Actividades:</span> {proyecto.secuenciaActidvidades || '--'}
                      </Card.Text>
                    )}

                    {proyecto.nivel === 'Secundaria' && (
                      <Card.Text>
                        <span style={{ fontWeight: 'bold' }}>Horas de Planificación:</span>
                        {proyecto.horasPlanificacion || proyecto.otrosHorasPlanificacion || ' --'}
                      </Card.Text>
                    )}
                    <Card.Text><span style={{ fontWeight: 'bold' }}>Evaluación del proyecto:</span> {proyecto.evaluacion || '--'}</Card.Text>

                    <Card.Text><span style={{ fontWeight: 'bold' }}>Producción(es) final(es):</span> {proyecto.otrosProducciones || '--'}</Card.Text>

                    <Card.Text><span style={{ fontWeight: 'bold' }}>Comentarios:</span> {proyecto.comentarios || '--'}</Card.Text>


                    <div className="d-flex justify-content-center mt-auto">
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Planificación')}>
                        Ver Planificación
                      </Button>
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Materiales')}>
                        Ver Materiales
                      </Button>
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Producciones')}>
                        Ver Producciones
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedSection}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedSection === 'Planificación' && (
            <div>
              {(proyecto.planificacion || []).length === 0
                ? <p>No hay archivos de planificación disponibles.</p>
                : (proyecto.planificacion || []).map((item, index) => (
                  <div key={index}>
                    <a href={baseUrl + item} target="_blank" rel="noopener noreferrer">
                      <p>Planificación</p>
                    </a>
                  </div>
                ))}
            </div>
          )}
          {selectedSection === 'Materiales' && (
            <div>
              {(proyecto.materiales || []).length === 0
                ? <p>No hay materiales disponibles.</p>
                : (proyecto.materiales || []).map((item, index) => (
                  <div key={index}>
                    <a href={baseUrl + item} target="_blank" rel="noopener noreferrer">
                      <p>Material {index + 1}</p>
                    </a>
                  </div>
                ))}
            </div>
          )}
          {selectedSection === 'Producciones' && (
            <div>
              {(proyecto.producciones || []).length === 0
                ? <p>No hay producciones disponibles.</p>
                : (proyecto.producciones || []).map((item, index) => (
                  <div key={index}>
                    <a href={baseUrl + item} target="_blank" rel="noopener noreferrer">
                      <p>Producción {index + 1}</p>
                    </a>
                  </div>
                ))}
            </div>
          )}
        </Modal.Body>

      </Modal>
    </Container>
  );
};

export { Mostrar };
