const app = require('./app');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

// IMPORTANTE: Hostinger inyecta el puerto automáticamente en process.env.PORT
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    console.log('--- Iniciando SupportComputer Backend ---');

    // 1. Intentar conectar a la DB (MySQL Hostinger)
    // Agregamos un log para saber si se queda trabado aquí
    console.log('Intentando conectar a la base de datos MySQL...');
    await connectDB();
    console.log('✅ Conexión a la DB exitosa.');

    // 2. Iniciar Express escuchando en todas las interfaces
    // Usar '0.0.0.0' es OBLIGATORIO en Hostinger
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo oficialmente en el puerto: ${PORT}`);
      console.log(`🔗 Acceso: https://filberdev.cloud`);
    });

  } catch (error) {
    console.error('❌ ERROR CRÍTICO AL INICIAR EL SERVIDOR:');
    console.error(error.message);
    
    // Si la DB falla, igual intentamos levantar el servidor para que no de 503
    // y podamos ver el error en la web o en logs.
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚠️ Servidor levantado en modo emergencia (Sin DB) en puerto ${PORT}`);
    });
  }
};

// Capturamos errores no controlados para que el proceso no muera
process.on('unhandledRejection', (err) => {
  console.log('Fallo no controlado (Promise Rejection):', err.message);
});

startServer();
