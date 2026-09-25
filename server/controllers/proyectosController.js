const proyectos = require("../models/proyModels");
const path = require("path");
const rootPath = path.join(__dirname, "..");
const publicFolderPath = path.join(rootPath, "public");

const CAMPOS_TEXTO = [
  "nombre",
  "nivel",
  "salas",
  "grado",
  "anho",
  "otroNivel",
  "nivelInvolucrado",
  "objetivoGeneral",
  "descripcion",
  "docenteReferente",
  "areas",
  "otroAreas",
  "cronograma",
  "otroCronograma",
  "materias",
  "otrosMaterias",
  "contenidosArticulacion",
  "otrosMateriales",
  "secuenciaActidvidades",
  "horasPlanificacion",
  "otrosHorasPlanificacion",
  "evaluacion",
  "otrosProducciones",
  "comentarios",
];

const CAMPOS_ARCHIVO = ["imagen", "materiales", "planificacion", "producciones"];

const modifyFilePaths = (filePaths) =>
  filePaths.map((filePath) => {
    const relativePath = path.relative(publicFolderPath, filePath);
    const correctedPath = relativePath.replace(/\\/g, "/");
    return correctedPath.startsWith("/") ? correctedPath : "/" + correctedPath;
  });

const rutasSubidas = (files, campo) =>
  files && files[campo] ? modifyFilePaths(files[campo].map((file) => file.path)) : [];

async function addProyectos(req, res) {
  try {
    const datos = {};
    CAMPOS_TEXTO.forEach((campo) => {
      datos[campo] = req.body[campo];
    });
    CAMPOS_ARCHIVO.forEach((campo) => {
      datos[campo] = rutasSubidas(req.files, campo);
    });

    const proyectoGuardado = await new proyectos(datos).save();

    res.status(201).send({ proyectoGuardado });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getProyectos(req, res) {
  try {
    const allProyectos = await proyectos.find().lean().exec();
    res.status(200).send({ allProyectos });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function getProyecto(req, res) {
  try {
    const { id } = req.params;

    const proyecto = await proyectos.findById(id);

    if (!proyecto) {
      res.status(404).send({ message: "Proyecto not found" });
    } else {
      res.status(200).send({ proyecto });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function updateProyecto(req, res) {
  try {
    const { id } = req.params;

    const cambios = {};
    CAMPOS_TEXTO.forEach((campo) => {
      if (req.body[campo] !== undefined) cambios[campo] = req.body[campo];
    });
    CAMPOS_ARCHIVO.forEach((campo) => {
      const rutas = rutasSubidas(req.files, campo);
      if (rutas.length > 0) cambios[campo] = rutas;
    });

    const updatedProyecto = await proyectos.findByIdAndUpdate(id, cambios, {
      new: true,
    });

    if (!updatedProyecto) {
      return res.status(404).send({ message: "Proyecto not found" });
    }

    res.status(200).send({ updatedProyecto });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProyecto(req, res) {
  try {
    const { id } = req.params;

    const deletedProyecto = await proyectos.findByIdAndDelete(id);

    if (!deletedProyecto) {
      return res.status(404).send({ message: "Proyecto not found" });
    }

    res.status(200).send({ deletedProyecto });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  addProyectos,
  getProyectos,
  getProyecto,
  updateProyecto,
  deleteProyecto,
};
