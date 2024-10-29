// src/loaders/index.ts
import { Application } from "express";
import http from "http";
import { Pool } from "mysql2/promise";
import OpenAI from "openai";
import expressLoader from "./express.loader";
import dependencyInjectionLoader from "./dependency-injection.loader";

interface LoaderOptions {
    app: Application;
    server: http.Server;
    pool: Pool;
    openai: OpenAI;
}

export default async function loaders({ app, server, pool, openai }: LoaderOptions) {
    // 의존성 주입 로더 실행
    await dependencyInjectionLoader({ pool, openai });

    // Express 로더 실행
    await expressLoader({ app });

    console.log("All loaders initialized successfully!");
}
