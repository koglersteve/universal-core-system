FROM node:22.12.0

WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install --force

# Copy schema BEFORE build
COPY prisma ./prisma

# Copy the rest of the source
COPY . .

# Force clean build
RUN rm -rf dist
RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/index.js"]
