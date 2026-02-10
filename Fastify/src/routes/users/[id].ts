import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // GET /users/:id
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
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
  fastify.put('/', async (request: FastifyRequest, reply: FastifyReply) => {
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
  fastify.delete('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    return {
      status: 'success',
      message: `用户${id}删除成功`
    };
  });
}
