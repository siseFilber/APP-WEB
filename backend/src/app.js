const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes'); // <-- Importar rutas de servicios
const ticketRoutes = require('./routes/ticket.routes');   // <-- Importar rutas de tickets

const app = express();

// Middlewares
// En tu app.js
const cors = require('cors');

// ... después del const app = express();
app.use(cors({
  origin: '*', // Permite peticiones desde cualquier lugar por ahora
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de SupportComputer corriendo ');
});

// Registro de Rutas
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes); // <-- Activar /api/services
app.use('/api/tickets', ticketRoutes);   // <-- Activar /api/tickets

module.exports = app;