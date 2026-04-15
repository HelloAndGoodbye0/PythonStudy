import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createLogger, transports, format } from 'winston'
import fs from 'fs'
import path from 'path'
import routes from './routes/index'
import { serveStatic } from '@hono/node-server/serve-static'

// 创建日志目录
const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

// 创建按时间命名的日志文件
const logFileName = `app-${new Date().toISOString().slice(0, 10)}.log`
const logFilePath = path.join(logsDir, logFileName)

// 配置 Winston 日志
const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack 
        ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new transports.File({
      filename: logFilePath,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
})

// 自定义日志中间件
const fileLogger = async (c: any, next: any) => {
  const start = Date.now()
  const method = c.req.method
  const path = c.req.path
  const queryParams = c.req.query()
  const body = method !== 'GET' ? await c.req.json().catch(() => null) : null
  
  await next()
  
  const duration = Date.now() - start
  const status = c.res.status
  
  const logData: any = {
    method,
    path,
    status,
    duration: `${duration}ms`
  }
  
  if (Object.keys(queryParams).length > 0) {
    logData.query = queryParams
  }
  
  if (body) {
    logData.body = body
  }
  
  winstonLogger.info(JSON.stringify(logData))
}

const app = new Hono()

// 全局中间件
app.use('*', cors())
app.use('*', logger())
app.use('*', fileLogger)
// 将 public 目录作为静态文件服务器
app.use('/public/*', serveStatic({ root: './'}))




// 挂载路由

app.route('/', routes)
app.get('/', (c) => c.text('Hello Hono!'))
// 404 处理
app.notFound((c) => {
  winstonLogger.warn(`404 Not Found: ${c.req.method} ${c.req.path}`)
  return c.json({ error: 'Not Found' }, 404)
})

// 错误处理
app.onError((err: Error, c: any) => {
  winstonLogger.error(`Error: ${err.message}`, err.stack)
  return c.json({ error: err.message }, 500)
})

// 启动服务器
const port = parseInt(process.env.PORT || '3001')

serve({
  fetch: app.fetch,
  port
}, (info) => {
  winstonLogger.info(`🚀 服务器运行在 http://localhost:${info.port}`)
  winstonLogger.info(`📝 环境: ${process.env.NODE_ENV || 'development'}`)
  winstonLogger.info(`📄 日志文件: ${logFilePath}`)
})
