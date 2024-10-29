// src/loaders/dependency-injection.loader.ts
import Container from "typedi";
import { Pool } from "mysql2/promise";
import OpenAI from "openai";

export default async function dependencyInjectionLoader({
    pool,
    openai,
}: {
    pool: Pool;
    openai: OpenAI;
}) {
    // 의존성 주입
    Container.set('pool', pool);       // MySQL pool 등록
    Container.set('openai', openai);   // OpenAI 등록

    console.log('Dependencies injected successfully!');
}
