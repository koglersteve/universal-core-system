FROM node:22.12.0

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Copy prisma schema BEFORE npm install so postinstall can see it
COPY prisma ./prisma

# Install dependencies (postinstall will now succeed)
RUN npm install --force

# Copy the rest of the backend
COPY . .

# Build TypeScript
RUN npm run build

CMD ["npm", "start"]

