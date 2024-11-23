# Usa Node.js como base
FROM node:16-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do frontend para o container
COPY . .

# Instala as dependências do projeto
RUN npm install

# Expõe a porta 3000 (será mapeada para 80 no compose)
EXPOSE 3000

# Comando para rodar o frontend
CMD ["npm", "start"]
