# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app

# Install OS deps for sharp (Next.js image optimization)
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install --production=false

# Build the app
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
