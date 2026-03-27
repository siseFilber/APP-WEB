const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Opcional: para ver logs en consola
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

// --- 1. CONFIGURACIÓN DE PROXY (CRÍTICO PARA HOSTINGER) ---
// Permite que Express confíe en las cabeceras enviadas por el proxy de Hostinger
app.set('trust proxy', 1);

// --- 2. CONFIGURACIÓN DE CORS ---
const allowedOrigins = [
  'https://shop.filberdev.cloud',
  'https://filberdev.cloud',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o apps móviles)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por política de CORS de DAY Tech'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// --- 3. RESPUESTA EXPLÍCITA A PRE-FLIGHT (OPTIONS) ---
// Esto soluciona el error 503/CORS en métodos PATCH/PUT
app.options('*', cors());

// --- 4. MIDDLEWARES DE PARSEO Y LOGS ---
app.use(morgan('dev')); // Te ayudará a ver qué rutas están fallando en los logs
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- 5. RUTA DE SALUD (HEALTH CHECK) ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    service: 'SupportComputer API',
    version: '1.2.0',
    timestamp: new Date().toISOString()
  });
});

// --- 6. REGISTRO DE RUTAS API ---
// Asegúrate de que estos archivos no tengan errores internos
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tickets', ticketRoutes);

// --- 7. MANEJO DE RUTAS NO ENCONTRADAS (404) ---
app.use((req, res) => {
  res.status(404).json({ message: 'La ruta solicitada no existe en el servidor.' });
});

// --- 8. MANEJO DE ERRORES GLOBAL ---
app.use((err, req, res, next) => {
  console.error('🔴 Error detectado:', err.message);
  res.status(err.status || 500).json({ 
    message: err.message || 'Error interno en el servidor de DAY Tech',
    error: process.env.NODE_ENV === 'development' ? err.stack : {} 
  });
});

module.exports = app;