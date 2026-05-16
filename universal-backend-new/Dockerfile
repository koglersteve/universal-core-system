FROM node:22.12.0

WORKDIR /app

# Copy only backend package files
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN npm install --force

RUN npm run build

CMD ["node", "dist/server.js"]
