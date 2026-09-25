import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { getProyectos, urlArchivo, usarImagenPorDefecto } from '../services/servProyectos';
import { Link } from 'react-router-dom';
import { useIdioma } from './idioma/IdiomaContext';

const Proyectos = () => {
  const { tr } = useIdioma();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargaProyectos() {
      try {
        const response = await getProyectos();
        setProyectos(response.data.allProyectos);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    cargaProyectos();
  }, []);

  const traducirLista = (lista) => (lista || []).map((item) => tr(item)).join(', ');

  const renderProyectos = (nivel) => {
    const filteredProyectos = proyectos.filter((proyecto) => proyecto.nivel === nivel);

    if (filteredProyectos.length === 0) {
      return <p>{tr('No hay proyectos disponibles')}</p>;
    }

    return filteredProyectos.map((proyecto) => {
      const imageUrl = urlArchivo(
        proyecto.imagen && proyecto.imagen.length > 0
          ? proyecto.imagen[0]
          : "imagen/default.jpg"
      );

      let etiqueta = '';
      let contenidoEtiqueta = '';

      if (proyecto.nivel === 'Inicial') {
        etiqueta = 'Sala(s)';
        contenidoEtiqueta = traducirLista(proyecto.salas);
      } else if (proyecto.nivel === 'Primaria') {
        etiqueta = 'Grado(s)';
        contenidoEtiqueta = traducirLista(proyecto.grado);
      } else if (proyecto.nivel === 'Secundaria') {
        etiqueta = 'Año(s)';
        contenidoEtiqueta = traducirLista(proyecto.anho);
      }

      return (
        <Col key={proyecto._id} xs={12} md={8} lg={4}>
          <Card className="text-center m-3">
            <Card.Body>
              <Card.Text style={{ fontSize: "1.8rem", fontWeight: "600", color: "#00618b", marginTop: "2rem" }} className="m-2">{proyecto.nombre}</Card.Text>
              <hr />
              <Card.Img
                variant="top"
                src={imageUrl}
                alt={proyecto.nombre}
                onError={usarImagenPorDefecto}
                className="img-fluid mb-3"
              />
              <Card.Text>{proyecto.descripcion}</Card.Text>
              <Card.Title>{tr(etiqueta)}</Card.Title><p>{contenidoEtiqueta || '--'}</p>

        {proyecto.nivel === 'Inicial' && (
          <>
            <Card.Title>{tr('Área(s)')}</Card.Title>
            <p>{traducirLista(proyecto.areas) || '--'}</p>
          </>
        )}

        {(proyecto.nivel === 'Primaria' || proyecto.nivel === 'Secundaria') && (
          <>
            <Card.Title>{tr('Materia(s)')}</Card.Title>
            <p>{traducirLista(proyecto.materias) || '--'}</p>
          </>
        )}

              <Button className="mt-3" variant="primary" as={Link} to={`../mostrarProyectos/${proyecto._id}`}>
                {tr('Ver Proyecto')}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  if (loading) {
    return <Container fluid style={{ maxWidth: '1400px' }}><p className="m-4">{tr('Cargando proyectos...')}</p></Container>;
  }

  if (error) {
    return <Container fluid style={{ maxWidth: '1400px' }}><p className="m-4 text-danger">{tr('No se pudieron cargar los proyectos. Por favor, intentá de nuevo más tarde.')}</p></Container>;
  }

  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Row className="tarjetas pb-3">
        <h2 className="titulo">{tr('Proyectos Inicial')}</h2>
        <hr />
        {renderProyectos('Inicial')}
        <hr />
      </Row>

      <Row className="tarjetas pb-3">
        <h2 className="titulo">{tr('Proyectos Primaria')}</h2>
        <hr />
        {renderProyectos('Primaria')}
        <hr />
      </Row>

      <Row className="tarjetas pb-3">
        <h2 className="titulo">{tr('Proyectos Secundaria')}</h2>
        <hr />
        {renderProyectos('Secundaria')}
      </Row>
    </Container>
  );
};

export { Proyectos };
