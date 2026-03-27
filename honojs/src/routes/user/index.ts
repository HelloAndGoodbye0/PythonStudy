import { Hono } from 'hono'

const userRouter = new Hono()

// 获取用户列表
userRouter.get('/', (c) => {
  return c.json({
    users: [
      { id: 1, name: '张三', email: 'zhangsan@example.com' },
      { id: 2, name: '李四', email: 'lisi@example.com' }
    ]
  })
})

// 获取单个用户
userRouter.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    id,
    name: `用户 ${id}`,
    email: `user${id}@example.com`
  })
})

// 创建用户
userRouter.post('/', async (c) => {
  const body = await c.req.json()
  return c.json({
    message: '用户创建成功',
    data: {
      id: Date.now(),
      ...body
    }
  }, 201)
})

// 更新用户
userRouter.put('/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  return c.json({
    message: '用户更新成功',
    data: {
      id,
      ...body
    }
  })
})

// 删除用户
userRouter.delete('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    message: `用户 ${id} 删除成功`
  })
})

export default userRouter
