import http from "http";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
import Container from "typedi";
import ChatService from "../services/chat.service";
import ChatRoomInfo from "../types/chat";

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
    const redis = new Redis({
        host : "127.0.0.1",
        port : 6379
    });

    io.on("connection", async (socket : Socket) => {
        let chatRoomInfo : ChatRoomInfo | null = null;
        console.log("user connected");

        
        socket.on("create room", async() => {
            const roomId = uuidv4();
            await redis.set(`room:${roomId}`, JSON.stringify({ createdAt : Date.now() }));
            socket.emit("room created", { roomId });
            console.log(`room ${roomId} created`)
        })

        socket.on("join room", async (roomId: string) => {
            try {
                const roomExists = await redis.exists(`room:${roomId}`);
                if (!roomExists) {
                    return socket.emit("error", { message: `Room ${roomId} does not exist` });
                }
        
                await redis.sadd(`room:${roomId}:members`, socket.id);
                socket.join(`room-${roomId}`); // 클라이언트 소켓을 방에 추가
                socket.emit("room joined", { roomId }); // 방 참여 성공 메시지
        
                console.log(`Client ${socket.id} joined room ${roomId}`);
            } catch (error) {
                console.error("Error joining room:", error);
                socket.emit("error", { msg: "Failed to join room" });
            }
        });

        socket.on("chat message", async ({roomId, msg} : {roomId : string, msg : string}) => {
            try{
                console.log(`Message received in room ${roomId} : `, msg);
                const answer = await chatService.askQuestion(null, msg);

                io.to(`room-${roomId}`).emit("chat message",{ roomId, answer });
                console.log(`AI responded in room ${roomId} : ${answer}`);

            } catch (error) {
                console.error("Failed to send AI response", error);
                io.to(`room-${roomId}`).emit("chat message", {err : "failed send message"});
            }
        });

        socket.on("disconnect", async () =>{
            const roomKeys = await redis.keys("room:*:members");
            for (const key of roomKeys) {
                await redis.srem(key, socket.id);
            }
            console.log(`User ${socket.id} disconnected`);
        })
    })
}