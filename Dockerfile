FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./

FROM base AS dev
ENV NODE_ENV=development
RUN npm install

EXPOSE 3001
CMD ["sh", "-c", "npm install && npm run dev"]

FROM base AS builder
ENV NODE_ENV=development
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/out ./out

EXPOSE 3001
CMD ["node", "out/index.js"]
