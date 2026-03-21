const express = require('express');
const cors = require('cors'); // <--- Ya está declarado aquí, ¡con esto basta!
const userRoutes = require('./routes/user.routes');
const serviceRoutes = require('./routes/service.routes');
const ticketRoutes = require('./routes/ticket.routes');

const app = express();

// Middlewares
// (Borramos la línea repetida de const cors que estaba aquí)

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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