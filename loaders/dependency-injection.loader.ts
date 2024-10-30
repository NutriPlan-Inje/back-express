import { Container } from 'typedi';
import { Pool } from 'mysql2/promise';
import OpenAI from 'openai';

export default async ({ pool, openai }: { pool: Pool; openai: OpenAI }) => {
    Container.set('pool', pool);
    Container.set('openai', openai);

    console.log('Dependencies injected successfully!');
};
