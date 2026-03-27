# 路由开发指南

## 目录结构
```
src/
├── index.ts           # 主入口文件（无需修改）
└── routes/
    ├── index.ts       # 路由聚合文件（新增路由需在此注册）
    ├── user/
    │   └── index.ts   # 用户路由
    └── auth/
        └── index.ts   # 认证路由
```

## 如何新增路由

### 1. 创建路由文件夹
在 `src/routes/` 目录下创建新文件夹，例如 `product/`：

```bash
src/routes/product/
└── index.ts
```

### 2. 编写路由文件
在文件夹中创建 `index.ts`：

```typescript
import { Hono } from 'hono'

const productRouter = new Hono()

productRouter.get('/', (c) => {
  return c.json({ message: '获取产品列表' })
})

productRouter.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ message: `获取产品 ${id}` })
})

export default productRouter
```

### 3. 注册路由
在 `src/routes/index.ts` 中导入并挂载：

```typescript
import { Hono } from 'hono'
import userRouter from './user/index.js'
import authRouter from './auth/index.js'
import productRouter from './product/index.js'  // 新增

const routes = new Hono()

routes.route('/user', userRouter)
routes.route('/auth', authRouter)
routes.route('/product', productRouter)  // 新增

export default routes
```

### 4. 测试路由
重启服务器后，新路由自动生效：
```bash
GET  /api/product      # 获取产品列表
GET  /api/product/123  # 获取产品详情
```

## 现有路由

| 路由 | 端点 | 功能 |
|------|------|------|
| `/api/user` | GET/POST/PUT/DELETE | 用户管理 |
| `/api/auth` | POST | 登录/注册/登出 |

## 最佳实践

1. 每个功能模块一个路由文件夹
2. 文件夹名使用小写，如 `user/`、`order/`
3. 路由逻辑统一放在文件夹下的 `index.ts`
4. 导出默认的 Hono 实例
5. 在 `routes/index.ts` 统一管理
