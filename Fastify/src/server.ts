import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'path';
import prismaPlugin from './plugins/prisma';

const fastify = Fastify({
  logger: true,
  exposeHeadRoutes: false
});

//注册prisma插件
fastify.register(prismaPlugin);

// 首页路由
fastify.get('/', async (request, reply) => {
  return { message: '欢迎使用 Fastify!', version: '1.0.0' };
});

// 使用官方 @fastify/autoload 自动加载路由
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes')
});

// 监听 fastify 的钩子，查看加载了哪些文件
fastify.addHook('onRoute', (routeOptions) => {
  console.log('Registered route:', routeOptions.method, routeOptions.url);
});


// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(' 服务器运行在 http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
