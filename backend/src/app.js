const express = require('express');
const cors = require('cors'); // <--- Ya está declarado aquí, ¡con esto basta!
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

// Middlewares
// (Borramos la línea repetida de const cors que estaba aquí)

// En src/app.js de tu Backend
app.use(cors({
  origin: [
    'https://shop.filberdev.cloud', // <-- ESTE ES EL QUE FALTA
    'https://filberdev.cloud', 
    'http://localhost:5173'         // Para tus pruebas locales
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de SupportComputer corriendo 🚀');
});

// Registro de Rutas
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;