const { execSync } = require("child_process");

try {
    console.log("🛠️ Generando cliente de Prisma para Linux...");
    // Esto prepara los binarios de la DB antes de que el servidor intente usarlos
    execSync("npx prisma generate", { stdio: "inherit" });
    
    console.log("🚀 Binarios listos. Iniciando servidor...");
    // Aquí llamamos a tu server.js actual
    require("./server"); 
} catch (error) {
    console.error("❌ Error en el pre-arranque:", error.message);
    // Intentamos arrancar el server aunque prisma falle para ver logs
    require("./server");
}