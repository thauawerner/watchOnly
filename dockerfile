# Use a imagem oficial do Node.js como base
FROM node:22.10

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do projeto para o container
COPY . .

# Compile o projeto (etapa de build)
RUN npm run build

# Exponha a porta que o Next.js vai rodar
EXPOSE 3000

# Comando para rodar o servidor em produção
CMD ["npm", "start"]
