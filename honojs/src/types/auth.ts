import { z } from 'zod'

// Zod 验证 Schema
export const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码不能少于6个字符')
})

export const registerSchema = z.object({
  username: z.string().min(3, '用户名不能少于3个字符').max(20, '用户名不能超过20个字符'),
  password: z.string().min(6, '密码不能少于6个字符').max(50, '密码不能超过50个字符'),
  email: z.string().email('邮箱格式不正确').optional()
})

// TypeScript 类型
export type Login = z.infer<typeof loginSchema>
export type Register = z.infer<typeof registerSchema>

export interface AuthUser {
  id: number
  username: string
  role: string
}

export interface LoginResponse {
  message: string
  token: string
  user: AuthUser
}

export interface RegisterResponse {
  message: string
  user: AuthUser & { email?: string }
}
