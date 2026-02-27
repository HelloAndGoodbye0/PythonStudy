import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { console } from 'node:inspector';
/**
 * 用户路由模块
 * 该模块定义了用户相关的API路由，包括获取用户列表、创建用户、获取单个用户、更新用户和删除用户等功能
 * @param fastify - Fastify实例，用于注册路由和处理请求
 */
export default async function (fastify: FastifyInstance) {
  // GET /users
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return fastify.prisma.user.findMany();
  });

  // POST /users
  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['name', 'email']
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { name: string; email: string };
    console.log(body);
    const newUser = await fastify.prisma.user.create({
      data: { email: body.email, name: body.name }
    });
    return {
      status: 'success',
      message: '用户创建成功',
      data: newUser
    }
  });

  // GET /users/:id
  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    let user = await fastify.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    return user
  });

  // PUT /users/:id
  fastify.put('/:id',{
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: []
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { name?: string; email?: string };
    const updatedUser = await fastify.prisma.user.update({
      where: { id: parseInt(id) },
      data: body
    });

    return {
      status: 'success',
      message: `用户更新成功`,
      data: {
        id: parseInt(id),
        ...body
      }
    };
  });

  // DELETE /users/:id
  fastify.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    await fastify.prisma.user.delete({
      where: { id: parseInt(id) }
    });
    return {
      status: 'success',
      message: `用户${id}删除成功`
    };
  });
}
