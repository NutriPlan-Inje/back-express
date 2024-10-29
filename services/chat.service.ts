import { Pool } from "mysql2/promise";
import OpenAI from "openai";
import{ Service, Inject } from "typedi";

@Service()
export default class ChatService {
    constructor(
        @Inject("openai") private readonly openai : OpenAI, 
        @Inject("pool") private readonly pool : Pool
    ){}
    askQuestion = async (previousMessage : string | null, question : string) : Promise<string>  => {
        try{
            const fineTuningContent : string = previousMessage
            ? `Your name is the Health and Nutrition Information Chatbot. Now, it’s time to deliver the current conversation content. A question, '${question}', has been sent. Please understand and provide an answer. If you know the person’s name, kindly use a polite expression such as, ', I can provide information about ~.' Please include as many details as possible and provide a specific answer. When you finish your response, please add a thank-you note. Previous message information: ${previousMessage}. You can refer to this information, but if you prefer, it’s okay to ignore it. (In this context, I am the one asking the question, and you are the one answering.) However, it may contain relevant information.`
            : `Your name is the Health and Nutrition Information Chatbot. Now, it’s time to deliver the current conversation content. A question, '${question}', has been sent. Please understand and provide an answer.  kindly use polite expressions such as, 'I can provide information about ~.' Please provide a detailed and specific response. When you finish your answer, please add a thank-you note. Please answer korean`;

            console.log(fineTuningContent);
            const completion = await this.openai.chat.completions.create({
                model : "gpt-3.5-turbo",
                messages : [{ role : "user", content : fineTuningContent}],
            });
            
            const answer = completion.choices[0].message.content as string || "응답을 생성하지 못 했습니다";
            console.log("응답 :", answer);

            return answer;
        } catch (error) {
            console.error("openAI API 호출 중 오류 발생", error);
            return "openAI API 호출 중 오류 발생";
        }
    }
    createChatRoom = async () => {
        
    }
}