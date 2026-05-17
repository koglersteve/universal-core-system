FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false --force

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/server.js"]
