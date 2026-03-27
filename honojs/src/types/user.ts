import { z } from 'zod'

// Zod 验证 Schema
export const createUserSchema = z.object({
  name: z.string().min(1, '用户名不能为空').max(50, '用户名不能超过50个字符'),
  email: z.string().email('邮箱格式不正确'),
  age: z.number().min(0, '年龄不能小于0').max(150, '年龄不能大于150').optional()
})

export const updateUserSchema = z.object({
  name: z.string().min(1, '用户名不能为空').max(50, '用户名不能超过50个字符').optional(),
  email: z.string().email('邮箱格式不正确').optional(),
  age: z.number().min(0, '年龄不能小于0').max(150, '年龄不能大于150').optional()
})

// TypeScript 类型（从 Zod 推导）
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>

export interface User {
  id: number
  name: string
  email: string
  age?: number
}

export interface UserResponse {
  id: number
  name: string
  email: string
  age?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
}
