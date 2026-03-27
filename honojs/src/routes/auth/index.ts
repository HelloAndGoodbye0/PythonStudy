import { Hono } from 'hono'

const authRouter = new Hono()

// 登录
authRouter.post('/login', async (c) => {
  const body = await c.req.json()
  const { username, password } = body
  
  // 模拟登录验证
  if (username === 'admin' && password === '123456') {
    return c.json({
      message: '登录成功',
      token: 'mock-token-123456',
      user: { id: 1, username, role: 'admin' }
    })
  }
  
  return c.json({
    message: '用户名或密码错误'
  }, 401)
})

// 注册
authRouter.post('/register', async (c) => {
  const body = await c.req.json()
  return c.json({
    message: '注册成功',
    user: {
      id: Date.now(),
      ...body
    }
  }, 201)
})

// 登出
authRouter.post('/logout', (c) => {
  return c.json({
    message: '登出成功'
  })
})

export default authRouter
