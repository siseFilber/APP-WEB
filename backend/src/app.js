const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes'); // <-- Importar rutas de servicios
const ticketRoutes = require('./routes/ticket.routes');   // <-- Importar rutas de tickets

const app = express();

// Middlewares
app.use(cors());
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