# Fastify TypeScript 示例

简单的 Fastify 服务器示例，使用 TypeScript 编写。

## 安装依赖

```bash
npm install
```

## 运行开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动

## API 端点

### GET /
返回欢迎消息

```bash
curl http://localhost:3000
```

### GET /hello/:name
返回个性化问候

```bash
curl http://localhost:3000/hello/张三
```

### POST /user
提交用户信息

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"username":"张三","email":"zhangsan@example.com"}'
```

## 构建生产版本

```bash
npm run build
npm start
```
