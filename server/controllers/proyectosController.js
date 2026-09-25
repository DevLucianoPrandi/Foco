const proyectos = require("../models/proyModels");
const path = require("path");
const rootPath = path.join(__dirname, "..");
const publicFolderPath = path.join(rootPath, "public");

async function addProyectos(req, res) {
  let proyectoInstance;
  try {
    const {
      nombre,
      nivel,
      salas,
      grado,
      anho,
      otroNivel,
      nivelInvolucrado,
      objetivoGeneral,
      descripcion,
      docenteReferente,
      areas,
      otroAreas,
      cronograma,
      otroCronograma,
      materias,
      otrosMaterias,
      contenidosArticulacion,
      otrosMateriales,
      secuenciaActidvidades,
      horasPlanificacion,
      otrosHorasPlanificacion,
      evaluacion,
      otrosProducciones,
      comentarios,
    } = req.body;

    const materialesPath = req.files["materiales"]
      ? req.files["materiales"].map((file) => file.path)
      : [];
    const produccionesPath = req.files["producciones"]
      ? req.files["producciones"].map((file) => file.path)
      : [];
    const planificacionPath = req.files["planificacion"]
      ? req.files["planificacion"].map((file) => file.path)
      : [];
      const imagenPath = req.files["imagen"]
      ? req.files["imagen"].map((file) => file.path)
      : [];


    console.log("materialesPath:", materialesPath);
    console.log("produccionesPath:", produccionesPath);
    console.log("planificacionPath:", planificacionPath);

    const modifyFilePaths = (filePaths) => {
      return filePaths.map((filePath) => {
        const relativePath = path.relative(publicFolderPath, filePath);
        const correctedPath = relativePath.replace(/\\/g, "/");
        return correctedPath.startsWith("/")
          ? correctedPath
          : "/" + correctedPath;
      });
    };

    proyectoInstance = new proyectos({
      nombre,
      imagen: modifyFilePaths(imagenPath),
      nivel,
      salas,
      grado,
      anho,
      otroNivel,
      nivelInvolucrado,
      objetivoGeneral,
      descripcion,
      docenteReferente,
      areas,
      otroAreas,
      cronograma,
      otroCronograma,
      materias,
      otrosMaterias,
      contenidosArticulacion,
      materiales: modifyFilePaths(materialesPath),
      otrosMateriales,
      planificacion: modifyFilePaths(planificacionPath),
      secuenciaActidvidades,
      horasPlanificacion,
      otrosHorasPlanificacion,
      evaluacion,
      producciones: modifyFilePaths(produccionesPath),
      otrosProducciones,
      comentarios,
    });

    const proyectoGuardado = await proyectoInstance.save();

    res.status(201).send({ proyectoGuardado });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
async function getProyectos(req, res) {
  const allProyectos = await proyectos.find().lean().exec();
  res.status(200).send({ allProyectos });
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
    const {
      nombre,
      nivel,
      sala,
      grado,
      anho,
      otroNivel,
      nivelInvolucrado,
      objetivoGeneral,
      descripcion,
      docenteReferente,
      areas,
      otroAreas,
      cronograma,
      otroCronograma,
      materias,
      otrosMaterias,
      contenidosArticulacion,
      materiales,
      otrosMateriales,
      planificacion,
      secuenciaActidvidades,
      horasPlanificacion,
      otrosHorasPlanificacion,
      evaluacion,
      producciones,
      otrosProducciones,
      comentarios,
    } = req.body;

    const materialesPath = req.files["materiales"]
      ? req.files["materiales"].map((file) => file.path)
      : [];
    const produccionesPath = req.files["producciones"]
      ? req.files["producciones"].map((file) => file.path)
      : [];
    const planificacionPath = req.files["planificacion"]
      ? req.files["planificacion"].map((file) => file.path)
      : [];

    const updatedProyecto = await proyectos.findByIdAndUpdate(
      id,
      {
        nombre,
        nivel,
        sala,
        grado,
        anho,
        otroNivel,
        nivelInvolucrado,
        objetivoGeneral,
        descripcion,
        docenteReferente,
        areas,
        otroAreas,
        cronograma,
        otroCronograma,
        materias,
        otrosMaterias,
        contenidosArticulacion,
        materiales: materialesPath,
        otrosMateriales,
        planificacion: planificacionPath,
        secuenciaActidvidades,
        horasPlanificacion,
        otrosHorasPlanificacion,
        evaluacion,
        producciones: produccionesPath,
        otrosProducciones,
        comentarios,
      },
      { new: true }
    );

    res.status(200).send({ updatedProyecto });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function deleteProyecto(req, res) {
  try {
    const { id } = req.params;

    const deletedProyecto = await proyectos.findByIdAndDelete(id);

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
