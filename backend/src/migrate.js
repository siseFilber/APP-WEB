const { execSync } = require("child_process");

console.log("🚀 Iniciando Migración Forzada en Hostinger...");

try {
    // Este comando empuja tu schema.prisma a la base de datos de Hostinger
    const output = execSync("npx prisma db push", { stdio: "inherit" });
    console.log("✅ Tablas creadas/sincronizadas con éxito.");
} catch (error) {
    console.error("❌ Error en la migración:", error.message);
}