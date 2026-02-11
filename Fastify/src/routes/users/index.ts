import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
console.log('users/index.ts');
export default async function (fastify: FastifyInstance) {
  // GET /users
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: 'success',
      data: [
        { id: 1, name: '用户1', email: 'user1@example.com' },
        { id: 2, name: '用户2', email: 'user2@example.com' }
      ]
    };
  });

  // POST /users
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { name: string; email: string };
    return {
      status: 'success',
      message: '用户创建成功',
      data: {
        id: 3,
        ...body
      }
    };
  });

   // GET /users/:id
  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    return {
      status: 'success',
      data: {
        id: parseInt(id),
        name: `用户${id}`,
        email: `user${id}@example.com`,
        createdAt: '2024-01-01'
      }
    };
  });

  // PUT /users/:id
  fastify.put('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { name?: string; email?: string };
    return {
      status: 'success',
      message: `用户${id}更新成功`,
      data: {
        id: parseInt(id),
        ...body
      }
    };
  });

  // DELETE /users/:id
  fastify.delete('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    return {
      status: 'success',
      message: `用户${id}删除成功`
    };
  });
}
