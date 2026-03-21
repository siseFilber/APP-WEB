const app = require('./app');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  // 1. Intentar conectar a la DB
  await connectDB();

  // 2. Iniciar Express
// En tu server.js
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor de SupportComputer corriendo en el puerto ${PORT}`);
});
};

startServer();