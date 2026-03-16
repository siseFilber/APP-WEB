# 1. Usamos una imagen de Node.js ligera
FROM node:20-alpine

# 2. Creamos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. Generamos el cliente de Prisma (CORREGIDO)
# Usamos una URL ficticia solo para que npx prisma generate no de error en el build
RUN DATABASE_URL="postgresql://user:pass@localhost:5432/db" npx prisma generate

# 7. Exponemos el puerto del backend
EXPOSE 4000

# 8. Comando para arrancar el servidor
CMD ["npm", "run", "dev"]