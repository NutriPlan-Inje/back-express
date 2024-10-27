import http from "http";
import Redis from "ioredis";
import { Server, Socket } from "socket.io";
import Container from "typedi";
import ChatService from "../services/chat.service";
import ChatRoomInfo from "../types/chat";

export function init( server : http.Server) {
    // const io = new Server(server, {
    //     path :  "/bot",
    //     cors : {
    //         origin : "*",
    //         methods :  ["GET", "POST"],
    //         credentials : true,
    //     },
    // });
    // const chatService : ChatService = Container.get("ChatService");
    // const redis = new Redis({
    //     host : "127.0.0.1",
    //     port : 6379
    // });

    // io.on("connection", async (socket : Socket) => {
    //     let chatRoomInfo : ChatRoomInfo | null = null;
    //     console.log("user connected");

    //     socket.on("join room", async (roomId : number) => {
    //         socket.join(`room-${roomId}`);
    //         console.log(`Client ${socket.id} joined room ${roomId}`);
    //         const { u_id, cr_room, u_nicknmae } = await chatService.
    //     })
    // })
}