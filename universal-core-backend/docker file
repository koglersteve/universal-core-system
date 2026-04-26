# Use the exact Node version Prisma 7.8.0 requires
FROM node:22.12.0

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Clean install
RUN npm install --force

# Copy the rest of the backend
COPY . .

# Ensure DATABASE_URL is available at build time
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Regenerate Prisma Client cleanly
RUN npx prisma generate

# Build TypeScript
RUN npm run build

CMD ["npm", "start"]

