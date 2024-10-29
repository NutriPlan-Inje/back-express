import createApp from './app';
import dotenv from 'dotenv';
import Container from 'typedi';
import ChatService from './services/chat.service';

dotenv.config();
const PORT = process.env.PORT || 3000;

(async function serverStart() {
    const { server } = await createApp();

    server.listen(PORT, () => {
        console.log(`${PORT} 포트에서 서버가 시작되었습니다`);
        //const res = Container.get(ChatService).askQuestion(null, "살을 어떻게 빼나요?");
        //console.log(res);
    });
})();
