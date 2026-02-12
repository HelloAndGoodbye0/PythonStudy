import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
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
