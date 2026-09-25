import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { getProyectoUnico, urlArchivo, usarImagenPorDefecto } from '../../services/servProyectos';
import { useParams } from 'react-router-dom';
import { useIdioma } from '../idioma/IdiomaContext';

const Mostrar = () => {
  const { tr, idioma } = useIdioma();
  const { _id } = useParams();
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    async function cargaProyecto() {
      try {
        const response = await getProyectoUnico(_id);
        setProyecto(response.data.proyecto);
      } catch (error) {
        setError(true);
      } finally {
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

  const imageUrl = urlArchivo(
    proyecto.imagen && proyecto.imagen.length > 0
      ? proyecto.imagen[0]
      : "imagen/default.jpg"
  );

  const traducirLista = (lista) => (lista || []).map((item) => tr(item)).join(', ');

  const listaDeNivel = (proyecto[proyecto.nivel && proyecto.nivel.toLowerCase() === 'inicial' ? 'salas' : 'grado'] || [])
    .map((item, index) => (idioma === 'es' && index > 0 ? item.toLowerCase() : tr(item)))
    .join(', ');

  const etiqueta = (texto) => <span style={{ fontWeight: 'bold' }}>{tr(texto)}</span>;

  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Row className='tarjetas pb-3 align-items-start'>
        <h1 className='titulo' style={{ fontSize: "1.8rem", fontWeight: "600", color: "#00618b", marginTop: "2rem", textAlign: "center" }}>{proyecto.nombre || '--'}</h1>
        {loading && <p>{tr('Cargando...')}</p>}
        {error && <p className="text-danger">{tr('Error cargando proyecto. Por favor, inténtelo de nuevo más tarde.')}</p>}
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
                      onError={usarImagenPorDefecto}
                      className="img-fluid"
                      style={{ margin: "1rem", boxShadow: "2px 1px 12px grey" }}
                    />
                  )}
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Text>
                      {etiqueta('Nivel:')} {tr(proyecto.nivel)}
                      {proyecto.nivel !== 'Secundaria' && (
                        <> - {listaDeNivel || '--'}</>
                      )}
                    </Card.Text>
                    <Card.Text>{etiqueta('Docente referente del proyecto:')} {proyecto.docenteReferente || '--'}</Card.Text>
                    <Card.Text>
                      {etiqueta('Otro(s) nivel(es) involucrado(s):')} {traducirLista(proyecto.nivelInvolucrado) || '--'}{proyecto.otroNivel ? ` - ${proyecto.otroNivel}` : ''}
                    </Card.Text>
                    <Card.Text>{etiqueta('Objetivo del proyecto:')} {proyecto.objetivoGeneral || '--'}</Card.Text>
                    <Card.Text>{etiqueta('Descripción del proyecto:')} {proyecto.descripcion || '--'}</Card.Text>
                    <Card.Text>
                      {etiqueta(proyecto.nivel === 'Inicial' ? 'Áreas relacionadas con el proyecto:' : 'Materias relacionadas con el proyecto:')} {(proyecto.nivel === 'Inicial' ? traducirLista(proyecto.areas) : traducirLista(proyecto.materias)) || '--'}
                    </Card.Text>
                    <Card.Text>
                      {etiqueta('Otras áreas/materias relacionadas con el proyecto:')}
                      {' '}{(proyecto.nivel === 'Inicial' ? proyecto.otroAreas : proyecto.otrosMaterias) || '--'}
                    </Card.Text>
                    <Card.Text>{etiqueta('Contenidos trabajados en otras materias o niveles para llevar a cabo el proyecto:')} {proyecto.contenidosArticulacion || '--'}</Card.Text>
                    <Card.Text>{etiqueta('Materiales utilizados para el proyecto:')} {proyecto.otrosMateriales || '--'}</Card.Text>

                    {proyecto.nivel === 'Secundaria' && (
                      <Card.Text>
                        {etiqueta('Secuencia de Actividades:')} {proyecto.secuenciaActidvidades || '--'}
                      </Card.Text>
                    )}

                    {proyecto.nivel === 'Secundaria' && (
                      <Card.Text>
                        {etiqueta('Horas de Planificación:')}
                        {' '}{proyecto.horasPlanificacion || proyecto.otrosHorasPlanificacion || '--'}
                      </Card.Text>
                    )}
                    <Card.Text>{etiqueta('Evaluación del proyecto:')} {proyecto.evaluacion || '--'}</Card.Text>

                    <Card.Text>{etiqueta('Producción(es) final(es):')} {proyecto.otrosProducciones || '--'}</Card.Text>

                    <Card.Text>{etiqueta('Comentarios:')} {proyecto.comentarios || '--'}</Card.Text>


                    <div className="d-flex justify-content-center mt-auto">
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Planificación')}>
                        {tr('Ver Planificación')}
                      </Button>
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Materiales')}>
                        {tr('Ver Materiales')}
                      </Button>
                      <Button className="m-2" variant="primary" onClick={() => handleSectionClick('Producciones')}>
                        {tr('Ver Producciones')}
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
          <Modal.Title>{selectedSection && tr(selectedSection)}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedSection === 'Planificación' && (
            <div>
              {(proyecto.planificacion || []).length === 0
                ? <p>{tr('No hay archivos de planificación disponibles.')}</p>
                : (proyecto.planificacion || []).map((item, index) => (
                  <div key={index}>
                    <a href={urlArchivo(item)} target="_blank" rel="noopener noreferrer">
                      <p>{tr('Planificación')}</p>
                    </a>
                  </div>
                ))}
            </div>
          )}
          {selectedSection === 'Materiales' && (
            <div>
              {(proyecto.materiales || []).length === 0
                ? <p>{tr('No hay materiales disponibles.')}</p>
                : (proyecto.materiales || []).map((item, index) => (
                  <div key={index}>
                    <a href={urlArchivo(item)} target="_blank" rel="noopener noreferrer">
                      <p>Material {index + 1}</p>
                    </a>
                  </div>
                ))}
            </div>
          )}
          {selectedSection === 'Producciones' && (
            <div>
              {(proyecto.producciones || []).length === 0
                ? <p>{tr('No hay producciones disponibles.')}</p>
                : (proyecto.producciones || []).map((item, index) => (
                  <div key={index}>
                    <a href={urlArchivo(item)} target="_blank" rel="noopener noreferrer">
                      <p>{tr('Producción')} {index + 1}</p>
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
