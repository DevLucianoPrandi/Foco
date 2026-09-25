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

app.post('/enviar-correo', (req, res) => {
  const { name, email, recipient, subject, message } = req.body;

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
    Mensaje enviado desde la web de PQM-Proyectos por: <b>${name}</b><br>
    <br>
    Este es el mensaje: <b>${message}</b><br>
    <br>
    Podés responder el mensaje a: <b>${email}</b>
  </body>
</html>
`;

const mailSubject = `PQM-Proyectos - ${subject}` ;

  const mailOptions = {
    name: name,
    from: `"${name}" <${email}>`,
    to: recipient,
    subject: mailSubject,
    html: mailBody,
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Correo enviado: ' + info.response);
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