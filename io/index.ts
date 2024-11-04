import http from "http";
import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
import Container from "typedi";
import ChatService from "../services/chat.service";
import ChatRoomInfo from "../types/chat";
import { Redis } from "ioredis";

export default function init( server : http.Server) {
    const io = new Server(server, {
        path :  "/bot",
        cors : {
            origin : "*",
            methods :  ["GET", "POST"],
            credentials : true,
        },
    });
    const chatService: ChatService = Container.get(ChatService);
    const redis : Redis = Container.get('redis');

    io.on("connection", async (socket : Socket) => {
        //let chatRoomInfo : ChatRoomInfo | null = null;
        console.log("user connected");
        
        socket.on("create room", async () => {
            const roomId = uuidv4();
            await redis.set(`room:${roomId}`, JSON.stringify({ createdAt: Date.now() }));
            socket.emit("room created", { roomId });
            console.log(`Room ${roomId} created`);
        });

        socket.on("join room", async (roomId: string) => {
            try {
                const roomExists = await redis.exists(`room:${roomId}`);
                if (!roomExists) {
                    return socket.emit("error", { message: `Room ${roomId} does not exist` });
                }

                await redis.sadd(`room:${roomId}:members`, socket.id);
                socket.join(`room-${roomId}`);
                socket.emit("room joined", { roomId });
                console.log(`Client ${socket.id} joined room ${roomId}`);
            } catch (error) {
                console.error("Error joining room:", error);
                socket.emit("error", { msg: "Failed to join room" });
            }
        });

        socket.on("chat message", async ({ roomId, msg }: { roomId: string; msg: string }) => {
            try {
                const timestamp: number = Date.now();
                const messageData = JSON.stringify({ timestamp, msg, senderName: socket.id });

                await redis.rpush(`room:${roomId}:messages`, messageData);
                await redis.expire(`room:${roomId}:messages`, 3600); // TTL of 1 hour

                console.log(`Message received in room ${roomId}:`, msg);

                //const answer = await chatService.askQuestion(null, msg);
                const answer = "나의 대답이다!!"
                io.to(`room-${roomId}`).emit("chat message", { roomId, answer });
                console.log(`AI responded in room ${roomId}: ${answer}`);
            } catch (error) {
                console.error("Failed to send AI response", error);
                io.to(`room-${roomId}`).emit("chat message", { err: "failed to send message" });
            }
        });

        socket.on("disconnect", async () => {
            const roomKeys = await redis.keys("room:*:members");
            for (const key of roomKeys) {
                await redis.srem(key, socket.id);
            }
            console.log(`User ${socket.id} disconnected`);
        });
    })
}