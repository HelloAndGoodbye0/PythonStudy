# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# 端口配置 - 可通过 docker run -e PORT=xxx 覆盖
ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/index.js"]
