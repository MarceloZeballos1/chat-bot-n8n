# Imagen base con Node.js
FROM node:20

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de tu backend
COPY . .

# Exponer el puerto en el que escucha tu app
EXPOSE 18569

# Comando para iniciar la app
CMD ["node", "registros.js"]
