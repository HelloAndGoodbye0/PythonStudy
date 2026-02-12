/**
 * prisma 插件
 */
import fp from 'fastify-plugin'
import { PrismaClient } from '../generated/prisma/client'
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

async function prismaPlugin(fastify: FastifyInstance, options: FastifyPluginOptions) {
    // 1. 初始化 Prisma 实例

    const connectionString = `${process.env.DATABASE_URL}`;

    const adapter = new PrismaBetterSqlite3({ url: connectionString });
    const prisma = new PrismaClient({ adapter });
    // 2. 连接数据库
    await prisma.$connect();

    // 3. 将 prisma 实例“装饰”到 fastify 对象上
    // 这样你在任何路由里都能通过 server.prisma 或 req.server.prisma 访问它
    fastify.decorate('prisma', prisma);

    // 4. 注册关闭钩子：当服务器关闭时，自动断开数据库连接
    fastify.addHook('onClose', async (server) => {
        await prisma.$disconnect();
    });
}

// 使用 fastify-plugin 包装，确保该插件在所有路由中全局共享
export default fp(prismaPlugin);