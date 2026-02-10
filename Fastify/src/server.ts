import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'path';

const fastify = Fastify({
  logger: true
});

// 首页路由
fastify.get('/', async (request, reply) => {
  return { message: '欢迎使用 Fastify!', version: '1.0.0' };
});

// 使用官方 @fastify/autoload 自动加载路由
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(' 服务器运行在 http://localhost:3000');
    console.log(' 可用的路由:');
    console.log('   GET  /');
    console.log('   GET  /users');
    console.log('   POST /users');
    console.log('   GET  /users/:id');
    console.log('   PUT  /users/:id');
    console.log('   DELETE /users/:id');
    console.log('   GET  /posts');
    console.log('   POST /posts\n');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
