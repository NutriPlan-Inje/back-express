import Container from "typedi";
import mysql from "mysql2/promise";
import OpenAI from "openai";

export default async ({ pool, openai}: { pool: mysql.Pool, openai : OpenAI}) =>{
    Container.set('pool', pool);
    Container.set('openai', openai);
}