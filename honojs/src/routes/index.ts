import { Hono } from 'hono'
import userRouter from './user/index.js'
import authRouter from './auth/index.js'

const routes = new Hono()

// 挂载路由模块
routes.route('/user', userRouter)
routes.route('/auth', authRouter)

// 导出路由
export default routes
