import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, CardImg } from 'react-bootstrap';
import { getProyectos } from '../services/servProyectos';
import { Link } from 'react-router-dom';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    async function cargaProyectos() {
      const response = await getProyectos();

      if (response.status === 200) {
        setProyectos(response.data.allProyectos);
      }
    }
    cargaProyectos();
  }, []);

  const renderProyectos = (nivel) => {
    const filteredProyectos = proyectos.filter((proyecto) => proyecto.nivel === nivel);

    if (filteredProyectos.length === 0) {
      return <p>No hay proyectos disponibles</p>;
    }

    const baseUrl = import.meta.env.VITE_APP_PUBLIC_STORAGE;

    return filteredProyectos.map((proyecto) => {
      const imageUrl = proyecto.imagen && proyecto.imagen.length > 0
        ? baseUrl + proyecto.imagen[0]
        : baseUrl + "imagen/default.jpg";

      let etiqueta = '';
      let contenidoEtiqueta = '';

      if (proyecto.nivel === 'Inicial') {
        etiqueta = 'Sala(s)';
        contenidoEtiqueta = (proyecto.salas || []).length > 0 ? (proyecto.salas || []).join(', ') : '';
      } else if (proyecto.nivel === 'Primaria') {
        etiqueta = 'Grado(s)';
        contenidoEtiqueta = (proyecto.grado || []).length > 0 ? (proyecto.grado || []).join(', ') : '';
      } else if (proyecto.nivel === 'Secundaria') {
        etiqueta = 'Año(s)';
        contenidoEtiqueta = (proyecto.anho || []).length > 0 ? (proyecto.anho || []).join(', ') : '';
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
                className="img-fluid mb-3"
              />
              <Card.Text>{proyecto.descripcion}</Card.Text>
              <Card.Title>{etiqueta}</Card.Title><p>{contenidoEtiqueta || '--'}</p>
        
        {proyecto.nivel === 'Inicial' && (
          <>
            <Card.Title>Área(s)</Card.Title>
            <p>{(proyecto.areas || []).join(', ') || '--'}</p>
          </>
        )}

        {(proyecto.nivel === 'Primaria' || proyecto.nivel === 'Secundaria') && (
          <>
            <Card.Title>Materia(s)</Card.Title>
            <p>{(proyecto.materias || []).join(', ') || '--'}</p>
          </>
        )}

              <Button className="mt-3" variant="primary" as={Link} to={`../mostrarProyectos/${proyecto._id}`}>
                Ver Proyecto
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Row className="tarjetas pb-3">
        <h2 className="titulo">Proyectos Inicial</h2>
        <hr />
        {renderProyectos('Inicial')}
        <hr />
      </Row>

      <Row className="tarjetas pb-3">
        <h2 className="titulo">Proyectos Primaria</h2>
        <hr />
        {renderProyectos('Primaria')}
        <hr />
      </Row>

      <Row className="tarjetas pb-3">
        <h2 className="titulo">Proyectos Secundaria</h2>
        <hr />
        {renderProyectos('Secundaria')}
      </Row>
    </Container>
  );
};

export { Proyectos };
