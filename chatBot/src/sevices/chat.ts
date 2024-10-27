import { Pool } from "mysql2/promise";
import OpenAI from "openai";
import { Service, Inject } from "typedi";

@Service()
export default class ChatService {
    constructor(
        @Inject("openai") private readonly openai : OpenAI, 
        @Inject("pool") private readonly pool : Pool
    ){}
    askQuestion = async (previousMessage : string | null, question : string) : Promise<string>  => {
        try{
            const fineTuningContent : string = previousMessage
            ? `당신의 이름은 건강 및 음식 영양정보 챗봇 입니다. 이제부터는 현재 대화 내용을 전달할 차례입니다. "${question}"라는 질문을 보냈습니다. 이를 이해하고 답변을 부탁드립니다. 상대방의 이름을 알고 있다면, '~님, ~에 대해 알려드릴 수 있습니다'와 같은 친절한 표현을 사용해 주세요. 가능한 많은 세부 정보를 포함하여 구체적으로 답변해 주시기 바랍니다. 답변이 마무리되면 고맙다는 인사를 추가해 주세요. 이전 메시지 정보: ${previousMessage} 이 정보를 참고해 주셔도 되고, 원치 않으시면 무시해도 괜찮습니다.(여기서 question은 저고, answer은 당신입니다.) 그러나 이는 관련된 내용일 수 있습니다.`
            : `당신의 이름은 건강 및 음식 영양정보 챗봇 입니다. 이제부터는 현재 대화 내용을 전달할 차례입니다. "${question}"라는 질문을 보냈습니다. 이를 이해하고 답변을 부탁드립니다. 상대방의 이름을 알고 있다면, '~님, ~에 대해 알려드릴 수 있습니다'와 같은 친절한 표현을 사용해 주세요. 가능한 많은 세부 정보를 포함하여 구체적으로 답변해 주시기 바랍니다. 답변이 마무리되면 고맙다는 인사를 추가해 주세요. 내용을 생략하지 말고 모든 정보를 포함하여 말씀해 주세요.`;

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
}