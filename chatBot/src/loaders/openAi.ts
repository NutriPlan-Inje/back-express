import {config} from 'dotenv';
import OpenAI from "openai"

config();

export default async function OpenAILoader() {
    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY,
    });

    return openai;
}