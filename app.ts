// src/app.ts
import 'reflect-metadata';
import express, { Application } from 'express';
import http from 'http';
import chatSocket from './io/index';
import loaders from './loaders';
import mysqlLoader from './loaders/mysql.loader';
import openaiLoader from './loaders/openai.loader';
import dependencyInjectionLoader from './loaders/dependency-injection.loader';

export default async function createApp(): Promise<{ app: Application; server: http.Server }> {
    const app: Application = express();
    const server = http.createServer(app);

    try {
        // 1️⃣ MySQL 및 OpenAI 초기화
        const pool = await mysqlLoader();
        console.log('MySQL pool initialized.');

        const openai = await openaiLoader();
        console.log('OpenAI initialized.');

        // 2️⃣ 의존성 주입 로더 호출
        await dependencyInjectionLoader({ pool, openai });

        // 3️⃣ 기본 API 엔드포인트 설정
        app.get('/api1', (req, res) => {
            res.send('<h1>Good!!~~</h1>');
        });

        // 4️⃣ Socket.IO 초기화
        chatSocket(server);

        // 5️⃣ Express 및 로더 호출
        await loaders({ app, server, pool, openai });

        console.log('All loaders initialized successfully!');
    } catch (error) {
        console.error('Error during app initialization:', error);
        process.exit(1);
    }

    return { app, server };
}
