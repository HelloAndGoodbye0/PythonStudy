import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createUserSchema, updateUserSchema, User } from '../../types/user.js'

const userRouter = new Hono()

// 获取用户列表
userRouter.get('/', (c) => {
  const users: User[] = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ]
  
  return c.json({
    users,
    total: users.length
  })
})

// 获取单个用户
userRouter.get('/:id', (c) => {
  const id = c.req.param('id')
  const user: User = {
    id: parseInt(id),
    name: `用户 ${id}`,
    email: `user${id}@example.com`
  }
  
  return c.json(user)
})

// 创建用户（带数据验证）
userRouter.post(
  '/',
  zValidator('json', createUserSchema),
  async (c) => {
    const body = c.req.valid('json')
    const user: User = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      age: body.age
    }
    
    return c.json({
      message: '用户创建成功',
      data: user
    }, 201)
  }
)

// 更新用户（带数据验证）
userRouter.put(
  '/:id',
  zValidator('json', updateUserSchema),
  async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    
    const user: User = {
      id: parseInt(id),
      name: body.name || '',
      email: body.email || '',
      age: body.age
    }
    
    return c.json({
      message: '用户更新成功',
      data: user
    })
  }
)

// 删除用户
userRouter.delete('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({
    message: `用户 ${id} 删除成功`
  })
})

export default userRouter
