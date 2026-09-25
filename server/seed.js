require('dotenv').config({ path: './.env.production' });
const mongoose = require('mongoose');

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// ── Datos exportados desde los CSVs ──────────────────────────────────────────

const proyectos = [
  {
    _id: new mongoose.Types.ObjectId('657c94735d11b9661ff6247e'),
    nombre: 'Alemano',
    imagen: ['/imagen/1702663283581.jpeg'],
    nivel: 'Inicial',
    salas: ['Sala de 2', 'Sala de 3', 'Sala de 4', 'Sala de 5'],
    otroNivel: '6to grado',
    nivelInvolucrado: ['Primaria'],
    objetivoGeneral: 'Acercamiento a la cultura alemana',
    descripcion: 'bla bla bla',
    docenteReferente: 'Luciano Prandi',
    areas: [
      'Educación afectiva, ética y social',
      'Educación del ambiente social y natural',
      'Educación matemática',
    ],
    materiales: [
      '/materiales/1702663283612.pdf',
      '/materiales/1702663283618.pdf',
      '/materiales/1702663283625.pdf',
    ],
    planificacion: ['/planificacion/1702663283642.pdf'],
    producciones: [
      '/producciones/1702663283648.jpg',
      '/producciones/1702663283678.jpg',
    ],
    createdAt: new Date('2023-12-15T18:01:23.757Z'),
    updatedAt: new Date('2023-12-15T18:01:23.757Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('657c95ef5d11b9661ff6248d'),
    nombre: 'Aymara',
    imagen: [],
    nivel: 'Inicial',
    salas: [],
    otroNivel: '',
    nivelInvolucrado: [],
    objetivoGeneral: '',
    descripcion: '',
    docenteReferente: '',
    areas: [],
    materiales: [],
    planificacion: [],
    producciones: [],
    createdAt: new Date('2023-12-15T18:07:43.277Z'),
    updatedAt: new Date('2023-12-15T18:07:43.277Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('657c9ced5d11b9661ff624cf'),
    nombre: 'Aymara',
    imagen: ['/imagen/1702665453018.jpg'],
    nivel: 'Secundaria',
    anho: ['Primer año'],
    otroNivel: '6to grado',
    nivelInvolucrado: ['Primaria'],
    objetivoGeneral: 'Reflexión sobre la teoría matemática',
    descripcion: 'ble ble ble',
    docenteReferente: 'El de matemática',
    materias: ['Matematica'],
    cronograma: ['mensual'],
    materiales: [
      '/materiales/1702665453078.jpg',
      '/materiales/1702665453106.jpg',
    ],
    planificacion: [],
    producciones: [
      '/producciones/1702665453126.jpeg',
      '/producciones/1702665453160.jpg',
    ],
    createdAt: new Date('2023-12-15T18:37:33.168Z'),
    updatedAt: new Date('2023-12-15T18:37:33.168Z'),
  },
];

const focos = [
  {
    _id: new mongoose.Types.ObjectId('6570686408488490e59c5472'),
    id: 1,
    foco: 'Proyectos',
    niveles: ['Inicial', 'Primaria', 'Secundaria'],
    coordinador: 'Luciano Prandi',
    participantes: ['Andrea Kunz', 'Sabrina Masini', 'Alejandro Zold', 'Carolina Riemann'],
  },
  {
    _id: new mongoose.Types.ObjectId('6570686408488490e59c5473'),
    id: 2,
    foco: 'Individualización',
    niveles: ['Inicial', 'Primaria', 'Secundaria'],
    coordinador: 'Silvana De Ingeniis',
    participantes: ['Leonora Medina', 'Mariana Spitalnik', 'María Inés Librio', 'Sabrina López', 'Marion Hirsch'],
  },
  {
    _id: new mongoose.Types.ObjectId('6570686408488490e59c5474'),
    id: 3,
    foco: 'Deutsch',
    niveles: ['Inicial', 'Primaria', 'Secundaria'],
    coordinador: 'Karin Lux, András Horváth',
    participantes: ['Karen Ziegler', 'Natalia Gregorio', 'Araceli Salvia', 'Veronika Wachsmuth', 'Arne Baumann', 'Marion Hirsch', 'Daniel Gartenhaus'],
  },
];

const participantes = [
  {
    _id: new mongoose.Types.ObjectId('6570881c08488490e59c5553'),
    id: 1, nombre: 'Luciano', apellido: 'Prandi',
    nivel: 'Primaria, Secundaria', foco: 'Proyectos', rol: 'Coordinador',
    email: 'luciano.prandi@pestalozzi.edu.ar',
  },
  {
    _id: new mongoose.Types.ObjectId('6570881c08488490e59c5554'),
    id: 2, nombre: 'Andrea', apellido: 'Kunz',
    nivel: 'Primaria', foco: 'Proyectos', rol: 'Representante',
    email: 'andrea.kunz@pestalozzi.edu.ar',
  },
  {
    _id: new mongoose.Types.ObjectId('6570881c08488490e59c5555'),
    id: 3, nombre: 'Sabrina', apellido: 'Masini',
    nivel: 'Inicial', foco: 'Proyectos', rol: 'Representante',
    email: 'sabrina.masini@pestalozzi.edu.ar',
  },
  {
    _id: new mongoose.Types.ObjectId('6570881c08488490e59c5556'),
    id: 4, nombre: 'Alejandro', apellido: 'Zold',
    nivel: 'Comisión directiva', foco: 'Proyectos', rol: 'Representante',
    email: 'alezold@gmail.com',
  },
  {
    _id: new mongoose.Types.ObjectId('6570881c08488490e59c5557'),
    id: 5, nombre: 'Carolina', apellido: 'Riemann',
    nivel: 'Comisión directiva', foco: 'Proyectos', rol: 'Representante',
    email: 'carolinariemann@gmail.com',
  },
];

// ── Importación ───────────────────────────────────────────────────────────────

async function seed () {
  await mongoose.connect(uri);
  console.log('Conectado a MongoDB:', uri);

  const db = mongoose.connection.db;

  await importCollection(db, 'proyectos', proyectos);
  await importCollection(db, 'focos', focos);
  await importCollection(db, 'participantes', participantes);

  console.log('\n✓ Restauración completada.');
  await mongoose.disconnect();
}

async function importCollection (db, name, data) {
  const col = db.collection(name);
  const existing = await col.countDocuments();
  if (existing > 0) {
    console.log(`  [${name}] Ya tiene ${existing} documentos — omitido (usá --force para sobreescribir)`);
    return;
  }
  await col.insertMany(data);
  console.log(`  [${name}] ${data.length} documentos importados`);
}

seed().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
