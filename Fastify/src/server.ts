import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// 定义路由
fastify.get('/', async (request, reply) => {
  return { message: '欢迎使用 Fastify!' };
});

// GET 请求示例
fastify.get('/hello/:name', async (request, reply) => {
  const { name } = request.params as { name: string };
  return { message: `你好2, ${name}!` };
});

// POST 请求示例
fastify.post('/user', async (request, reply) => {
  const body = request.body as { username: string; email: string };
  return {
    status: 'success',
    data: {
      username: body.username,
      email: body.email,
      timestamp: new Date().toISOString()
    }
  };
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('服务器运行在 http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
