import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginSchema, registerSchema, AuthUser, LoginResponse, RegisterResponse } from '../../types/auth.js'

const authRouter = new Hono()

// 登录（带数据验证）
authRouter.post(
  '/login',
  zValidator('json', loginSchema),
  async (c) => {
    const body = c.req.valid('json')
    const { username, password } = body
    
    // 模拟登录验证
    if (username === 'admin' && password === '123456') {
      const response: LoginResponse = {
        message: '登录成功',
        token: 'mock-token-123456',
        user: { id: 1, username, role: 'admin' }
      }
      return c.json(response)
    }
    
    return c.json({
      message: '用户名或密码错误'
    }, 401)
  }
)

// 注册（带数据验证）
authRouter.post(
  '/register',
  zValidator('json', registerSchema),
  async (c) => {
    const body = c.req.valid('json')
    const response: RegisterResponse = {
      message: '注册成功',
      user: {
        id: Date.now(),
        username: body.username,
        role: 'user',
        email: body.email
      }
    }
    return c.json(response, 201)
  }
)

// 登出
authRouter.post('/logout', (c) => {
  return c.json({
    message: '登出成功'
  })
})

export default authRouter
