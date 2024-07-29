# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar un servidor HTTP para servir los archivos estáticos
RUN npm install -g serve

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["serve", "-s", "build"]
