import createApp from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

(async function serverStart() {
    const { server } = await createApp();

    server.listen(PORT, () => {
        console.log(`${PORT} 포트에서 서버가 시작되었습니다`);
    });
})();
