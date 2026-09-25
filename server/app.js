const express= require ('express')
const bodyParser = require ('body-parser')
const api = require('./routes/proyectos')
const nodemailer = require('nodemailer');
const cors = require ('cors');
const path = require('path');
const  { emailConfig }  = require("./config.js");
const usuario = process.env.EMAIL_USER || emailConfig.user;
const pass = process.env.EMAIL_PASS || emailConfig.pass;

const app = express()

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

 app.use('/v1', api );

const destinatariosPermitidos = (
  process.env.EMAIL_RECIPIENTS ||
  'andrea.kunz@pestalozzi.edu.ar,luciano.prandi@pestalozzi.edu.ar,sabrina.masini@pestalozzi.edu.ar'
).split(',').map((d) => d.trim());

const escaparHtml = (texto) =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const sinSaltos = (texto) => String(texto).replace(/[\r\n]+/g, ' ').trim();

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/enviar-correo', (req, res) => {
  const { name, email, recipient, subject, message } = req.body;

  if (!name || !email || !recipient || !subject || !message) {
    return res.status(400).send('Faltan campos obligatorios');
  }
  if (!emailValido.test(email)) {
    return res.status(400).send('Correo electrónico inválido');
  }
  if (!destinatariosPermitidos.includes(recipient)) {
    return res.status(400).send('Destinatario no permitido');
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    user: `${usuario}`,
    pass: `${pass}`,
  },
});

const mailBody = `
<html>
  <body>
    Mensaje enviado desde la web de PQM-Proyectos por: <b>${escaparHtml(name)}</b><br>
    <br>
    Este es el mensaje: <b>${escaparHtml(message)}</b><br>
    <br>
    Podés responder el mensaje a: <b>${escaparHtml(email)}</b>
  </body>
</html>
`;

const mailSubject = `PQM-Proyectos - ${sinSaltos(subject)}` ;

  const mailOptions = {
    name: sinSaltos(name),
    from: `"${sinSaltos(name).replace(/"/g, '')}" <${email}>`,
    to: recipient,
    subject: mailSubject,
    html: mailBody,
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Error enviando correo:', error);
      return res.status(500).send('No se pudo enviar el correo');
    }
    res.status(200).send('Correo enviado');
  });
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../proyectos/dist')));
  // Maneja cualquier ruta para cargar el index.html de Vite.js
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../proyectos/dist/index.html'));
  });
}


app.use(express.static( 'public'));


module.exports = app