const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

// --- 1. CONFIGURACIÓN DE PROXY (INDISPENSABLE EN HOSTINGER) ---
// Permite que Express lea correctamente las cabeceras HTTPS de Hostinger
app.set('trust proxy', 1);

// --- 2. CONFIGURACIÓN DE CORS GLOBAL ---
const allowedOrigins = [
  'https://shop.filberdev.cloud',
  'https://filberdev.cloud',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o Server-to-Server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por seguridad CORS de DAY Tech'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200 // Responde OK a peticiones OPTIONS
}));

// --- 3. MANEJO MANUAL DE PRE-FLIGHT ---
// Fuerza al servidor a responder 200 OK a cualquier petición OPTIONS antes de las rutas
app.options('*', cors());

// --- 4. MIDDLEWARES BÁSICOS ---
app.use(morgan('dev')); // Para que veas qué falla en los logs de Hostinger
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- 5. RUTA DE SALUD (HEALTH CHECK) ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    project: 'SupportComputer API',
    timestamp: new Date().toISOString()
  });
});

// --- 6. REGISTRO DE RUTAS API ---
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tickets', ticketRoutes);

// --- 7. MANEJO DE RUTAS NO EXISTENTES ---
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada en el laboratorio.' });
});

// --- 8. MANEJO DE ERRORES (EVITA QUE LA APP CRASHEE Y DE 503) ---
app.use((err, req, res, next) => {
  console.error('🔴 Error en el servidor:', err.message);
  res.status(err.status || 500).json({ 
    message: err.message || 'Error interno en DAY Tech'
  });
});

module.exports = app;