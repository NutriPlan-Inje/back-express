import { Application } from "express";
import http from 'http';
import expressLoader from './express.loader';
import dependencyInjectionLoader from './dependency-injection.loader';
import mysqlLoader from "./mysql.loader";
import openaiLoader from "./openai.loader"

export default async ({ app, server }: { app: Application, server: http.Server }) => {
    const pool = await mysqlLoader();
    console.log('promise mysql2 loaded successfully 😊');

    await dependencyInjectionLoader({ pool });
    console.log('DI loaded successfully 😊');
    
    const openai = await openaiLoader();
    console.log('openai loaded successfully 😊');

    
    await expressLoader({ app });
    console.log('express loaded successfully 😊');
};