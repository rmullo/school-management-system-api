# Usa uma imagem base com Node
FROM node:latest

# Cria diretório de trabalho dentro do container
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Instala nodemon globalmente (dev only)
RUN npm install -g nodemon

# Comando para rodar a app com nodemon
CMD ["npm", "run", "dev"]