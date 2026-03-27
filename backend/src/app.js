const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

// --- 1. CONFIGURACIÓN DE CORS (CABECERA DEL SISTEMA) ---
// Usamos una configuración robusta para producción en Hostinger
app.use(cors({
  origin: [
    'https://shop.filberdev.cloud',
    'https://filberdev.cloud',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200 // Necesario para navegadores antiguos y algunos proxies de Hostinger
}));

// --- 2. MANEJO EXPLICITO DE PRE-FLIGHT (OPTIONS) ---
// Esto asegura que cualquier petición OPTIONS (como la de PATCH) sea respondida de inmediato
app.options('*', cors());

// --- 3. MIDDLEWARES DE PARSEO ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 4. RUTA DE SALUD (HEALTH CHECK) ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    message: 'Servidor de SupportComputer corriendo 🚀',
    timestamp: new Date().toISOString()
  });
});

// --- 5. REGISTRO DE RUTAS API ---
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tickets', ticketRoutes);

// --- 6. MANEJO DE ERRORES GLOBAL (OPCIONAL PERO RECOMENDADO) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno en el servidor de DAY Tech' });
});

module.exports = app;