FROM node:20

WORKDIR /app

COPY lafflab-frontend/package*.json ./
RUN npm install

COPY lafflab-frontend/. .

RUN npm run build

CMD ["npm", "start"]
