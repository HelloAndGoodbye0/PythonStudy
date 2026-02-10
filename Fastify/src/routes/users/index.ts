import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

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
}
