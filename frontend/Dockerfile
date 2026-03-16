# 1. Usamos una imagen de Node.js ligera
FROM node:20-alpine

# 2. Creamos y entramos a la carpeta de la app
WORKDIR /app

# 3. Copiamos solo los archivos de dependencias para aprovechar la caché
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código del frontend
COPY . .

# 6. Exponemos el puerto de Vite
EXPOSE 5173

# 7. Comando para arrancar en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]