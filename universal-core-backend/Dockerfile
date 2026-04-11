FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client (required for Prisma 7)
RUN npx prisma generate

# Build your backend (if using ts-node or tsc)
RUN npm run build

CMD ["npm", "start"]
