const mongoose = require("mongoose");

const proyectosSchema = new mongoose.Schema(
  {
    nombre: String,
    imagen: [String],
    nivel: String,
    salas: [String],
    grado: [String],
    anho: [String],
    otroNivel: String,
    nivelInvolucrado: [String],
    objetivoGeneral: String,
    descripcion: String,
    docenteReferente: String,
    areas: [String],
    otroAreas: String,
    cronograma: [String],
    otroCronograma: String,
    materias: [String],
    otrosMaterias: String,
    contenidosArticulacion: String,
    materiales: [String],
    otrosMateriales: String,
    planificacion: [String],
    secuenciaActidvidades: String,
    horasPlanificacion: String,
    otrosHorasPlanificacion: String,
    evaluacion: String,
    producciones: [String],
    otrosProducciones: String,
    comentarios: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("proyectos", proyectosSchema);
