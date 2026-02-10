import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // GET /posts
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: 'success',
      data: [
        { id: 1, title: '文章1', content: '内容1' },
        { id: 2, title: '文章2', content: '内容2' }
      ]
    };
  });

  // POST /posts
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { title: string; content: string };
    return {
      status: 'success',
      message: '文章创建成功',
      data: {
        id: 3,
        ...body,
        createdAt: new Date().toISOString()
      }
    };
  });
}
