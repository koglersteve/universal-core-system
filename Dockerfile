# syntax=docker/dockerfile:1

ARG SERVICE=universal-backend-new
FROM node:22-alpine AS builder
ARG SERVICE
WORKDIR /app

# Copy the full repo context so we can build a selected service folder.
COPY . .

WORKDIR /app/${SERVICE}

# Install dependencies and build the selected service.
RUN npm install
RUN npm run build

FROM node:22-alpine AS runner
ARG SERVICE
WORKDIR /app
ENV NODE_ENV=production
ENV SERVICE=${SERVICE}

COPY --from=builder /app/${SERVICE} ./

# Install production dependencies only in the runtime image.
RUN npm install --production

EXPOSE 8080
CMD ["sh", "-c", "if [ \"$SERVICE\" = \"universal-core-frontend\" ]; then npm run start -- -p 8080; else npm run start; fi"]
