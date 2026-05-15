FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --force

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]
