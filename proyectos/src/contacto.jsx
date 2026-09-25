import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';

function Contacto() {

  const history = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {setShowModal(false);
  redirectToHome()};

  const redirectToHome = () => {
    history('/');
  };

  const handleSendEmail = async () => {
    const emailUrl = (import.meta.env.VITE_REACT_APP_BASE_URL || '').replace('/v1', '') + '/enviar-correo';
    try {
      const response = await fetch(emailUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, recipient, subject, message }),
      });

      console.log('Estado de la respuesta:', response.status);
      console.log('Texto de la respuesta:', await response.text());

      if (response.ok) {
        handleShowModal();
      } else {
        alert('Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el correo');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !recipient || !subject || !message) {
      alert('Por favor, completá todos los campos del formulario.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    handleSendEmail();
  };
  return (
    <Container fluid style={{ maxWidth: '1400px' }}>
      <Row className="mx-5">
        <Col className=" justify-content-center">
          <h3 style={{ color: "#d8972f", marginBottom: "1rem" }}>Formulario de contacto</h3>
          <p>En caso de tener alguna consulta, podés comunicarte con el referente del <span style={{ fontWeight: "600" }}>Foco Proyectos</span> de tu nivel a través del siguiente formulario:</p>
          <p><span style={{ fontWeight: "600" }}>Nivel Inicial:</span> Sabrina Masini<br /><span style={{ fontWeight: "600" }}>Nivel Primario:</span> Andrea Kunz / Luciano Prandi<br /><span style={{ fontWeight: "600" }}>Nivel Secundario y Coordinación de foco:</span> Luciano Prandi</p>
          <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#00618b" }}>¡Muchas gracias por tu colaboración!</p>
        </Col>
      </Row>
      <Row className="formCarga">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <hr />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <hr />
            <Form.Group controlId="formBasicRecipient">
              <Form.Label>Destinatario</Form.Label>
              <Form.Select aria-label="email destinatario" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                <option>Elegí un destinatario</option>
                <option value="andrea.kunz@pestalozzi.edu.ar">Andrea</option>
                <option value="luciano.prandi@pestalozzi.edu.ar">Luciano</option>
                <option value="sabrina.masini@pestalozzi.edu.ar">Sabrina</option>
              </Form.Select>
            </Form.Group>
            <hr />
            <Form.Group controlId="formBasicSubject">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Form.Group>
            <hr />
            <Form.Group controlId="formBasicMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Correo enviado con éxito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¡Gracias por tu mensaje! Hemos recibido tu correo electrónico.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

export { Contacto };