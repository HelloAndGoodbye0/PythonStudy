import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// 聊天室连接管理
const chatUsers = new Map<string, { socket: any; username: string }>();

interface ChatMessage {
    type: 'join' | 'message' | 'leave' | 'users-list';
    username?: string;
    content?: string;
    users?: string[];
    timestamp?: number;
}

// 广播消息给所有在线用户
function broadcastMessage(message: ChatMessage) {
    chatUsers.forEach((user) => {
        user.socket.send(JSON.stringify(message));
    });
}

export default async function (fastify: FastifyInstance) {
    fastify.get('/', { websocket: true }, function wsHandler(socket, req) {
        let userId = Date.now().toString();
        let username = '';

        socket.on('message', (rawMessage: Buffer) => {
            const data: ChatMessage = JSON.parse(rawMessage.toString());

            if (data.type === 'join') {
                // 用户加入
                username = data.username || `User_${userId}`;
                chatUsers.set(userId, { socket, username });

                // 通知所有用户有新用户加入
                broadcastMessage({
                    type: 'join',
                    username,
                    timestamp: Date.now(),
                });

                // 发送当前在线用户列表给新加入的用户
                socket.send(
                    JSON.stringify({
                        type: 'users-list',
                        users: Array.from(chatUsers.values()).map((u) => u.username),
                    })
                );
            } else if (data.type === 'message') {
                // 广播聊天消息给所有用户
                broadcastMessage({
                    type: 'message',
                    username,
                    content: data.content,
                    timestamp: Date.now(),
                });
            }
        });

        socket.on('close', () => {
            // 用户断开连接
            if (chatUsers.has(userId)) {
                chatUsers.delete(userId);

                // 通知其他用户有用户离线
                broadcastMessage({
                    type: 'leave',
                    username,
                    timestamp: Date.now(),
                });
            }
        });

        socket.on('error', (error: Error) => {
            console.error('WebSocket 错误:', error);
            if (chatUsers.has(userId)) {
                chatUsers.delete(userId);
            }
        });
    });
}