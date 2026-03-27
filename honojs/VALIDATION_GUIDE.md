# 数据验证指南

## 用户路由验证规则

### 创建用户验证
```typescript
{
  name: string (必填, 1-50字符),
  email: string (必填, 邮箱格式),
  age: number (可选, 0-150)
}
```

### 更新用户验证
```typescript
{
  name?: string (可选, 1-50字符),
  email?: string (可选, 邮箱格式),
  age?: number (可选, 0-150)
}
```

## 测试示例

### ✅ 有效的请求数据
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","email":"zhangsan@example.com","age":25}'
```

### ❌ 无效的请求数据
```bash
# 邮箱格式错误
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","email":"invalid-email"}'

# 年龄超出范围
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"张三","email":"test@example.com","age":200}'
```

## 验证错误响应格式
```json
{
  "success": false,
  "message": "Validation Failed",
  "issues": [
    {
      "message": "邮箱格式不正确",
      "path": ["email"]
    }
  ]
}
```

## 如何在其他路由添加验证

### 1. 导入依赖
```typescript
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
```

### 2. 定义验证规则
```typescript
const schema = z.object({
  field1: z.string().min(1),
  field2: z.number().optional()
})
```

### 3. 应用验证中间件
```typescript
router.post('/', zValidator('json', schema), async (c) => {
  const data = c.req.valid('json')
  // 处理验证后的数据
})
```

## Zod 常用验证规则

| 规则 | 说明 | 示例 |
|------|------|------|
| `z.string()` | 字符串 | `name: z.string()` |
| `z.number()` | 数字 | `age: z.number()` |
| `z.boolean()` | 布尔值 | `active: z.boolean()` |
| `.min(n)` | 最小值 | `age: z.number().min(0)` |
| `.max(n)` | 最大值 | `age: z.number().max(150)` |
| `.email()` | 邮箱格式 | `email: z.string().email()` |
| `.url()` | URL格式 | `website: z.string().url()` |
| `.optional()` | 可选字段 | `age: z.number().optional()` |
| `.default(value)` | 默认值 | `age: z.number().default(18)` |
