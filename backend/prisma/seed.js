const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'fernandezfilber2@gmail.com' },
    update: {},
    create: {
      email: 'fernandezfilber2@gmail.com',
      password: hashedPassword,
      name: 'Filber Administrador',
      role: 'ADMIN',
      dni: '12345678', // Asegúrate de que este DNI no exista ya en tu DB
      isVerified: true,
      status: 'ACTIVE'
    },
  });

  console.log('✅ Usuario Admin creado/actualizado:', admin);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });