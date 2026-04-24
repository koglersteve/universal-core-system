# Stage 1: Build the application
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:16 AS runner

WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm ci --omit=dev

# Start the application
CMD ["npm", "start"]
