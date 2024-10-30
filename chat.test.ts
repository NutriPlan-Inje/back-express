// import 'reflect-metadata';
// import http from "http";
// import { Server as SocketIOServer } from "socket.io";
// import { io as Client, Socket as ClientSocket } from "socket.io-client";
// import { Application } from "express";
// import express from "express";
// import loader from "./loaders";
// import { createPool, Pool } from "mysql2/promise";
// import OpenAI from "openai";

// let server: http.Server;
// let io: SocketIOServer;
// let clientSocket: ClientSocket;

// beforeAll(async () => {
//     try {
//         const app: Application = express();
//         server = http.createServer(app);

//         const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "dummy-key" });
//         const pool: Pool = createPool({
//             host: "localhost",
//             user: "root",
//             password: "password",
//             database: "test_db",
//         });

//         await loader({ app, server, pool, openai });

//         io = new SocketIOServer(server, { path: "/bot" });

//         // 서버 시작 및 클라이언트 소켓 연결
//         await new Promise<void>((resolve, reject) => {
//             server.listen(() => {
//                 const port = (server.address() as any).port;
//                 clientSocket = Client(`http://localhost:${port}/bot`);

//                 clientSocket.on("connect", () => {
//                     console.log("Client connected to server!");
//                     resolve();
//                 });

//                 clientSocket.on("connect_error", (err) => {
//                     console.error("Connection error:", err);
//                     reject(err);
//                 });
//             });
//         });

//         console.log("Test setup completed successfully!");
//     } catch (error) {
//         console.error("Error during test setup:", error);
//         throw error;
//     }
// }, 15000); // 전체 타임아웃 15초 설정

// afterAll(async () => {
//     if (clientSocket) clientSocket.close();
//     if (io) io.close();
//     await new Promise<void>((resolve, reject) => {
//         server.close((err) => (err ? reject(err) : resolve()));
//     });
// });

// describe("Chat Room Socket.IO Tests", () => {
//     it("should create a room and receive the room ID", async () => {
//         clientSocket.emit("create room");

//         const data = await new Promise<{ roomId: string }>((resolve) => {
//             clientSocket.on("room created", resolve);
//         });

//         expect(data).toHaveProperty("roomId");
//         expect(typeof data.roomId).toBe("string");
//         console.log(`Room created with ID: ${data.roomId}`);
//     }, 15000); // 개별 타임아웃 설정

//     it("should join a room successfully", async () => {
//         const roomId = "test-room";

//         clientSocket.emit("create room");
//         clientSocket.emit("join room", roomId);

//         const success = await new Promise<void>((resolve) => {
//             clientSocket.on("room joined", resolve);
//         });

//         console.log(`Successfully joined room ${roomId}`);
//     }, 15000); // 개별 타임아웃 설정
// });
