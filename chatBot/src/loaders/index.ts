import { Application } from "express";
import http from 'http';
import expressLoader from './express.loader';
import dependencyInjectionLoader from './dependency-injection.loader';
import mysqlLoader from "./mysql.loader";
import OpenAILoader from "./openAi";

export default async ({ app, server }: { app: Application, server: http.Server }) => {
    const pool = await mysqlLoader();
    console.log('promise mysql2 loaded successfully 😊');

    const openai = await OpenAILoader();
    console.log('OpenAILoader has been executed 😊');

    await dependencyInjectionLoader({ pool });
    console.log('DI loaded successfully 😊');
    
    await expressLoader({ app });
    console.log('express loaded successfully 😊');
};