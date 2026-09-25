const express = require('express')
const upload = require('../libs/storage')
const { addProyectos, getProyectos, getProyecto, updateProyecto,deleteProyecto } = require('../controllers/proyectosController')
const api = express.Router()

api.post('/proyectos', upload, addProyectos);
api.get('/proyectos', getProyectos);
api.get('/proyectos/:id', getProyecto);
api.put('/proyectos/:id', upload, updateProyecto);
api.delete('/proyectos/:id', deleteProyecto);

api.use(express.static('public'))

module.exports = api