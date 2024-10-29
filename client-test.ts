// client.ts
import io, { Socket } from "socket.io-client";
import readline from "readline";

// 서버와 연결 (서버의 주소와 경로 설정)
const socket: Socket = io("http://localhost:8080/bot");

// 메시지 인터페이스 정의
interface QuestionMessage {
    sender: string;
    question: string;
}

interface AnswerMessage {
    sender: string;
    answer: string;
}

// readline 인터페이스 생성 (콘솔 입력)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 서버에 연결되었을 때 처리
socket.on("connect", () => {
    console.log(`Connected with ID: ${socket.id}`);

    // 특정 방에 참여
    const roomId = 2; // 서버에 존재하는 방 번호와 일치해야 합니다.
    socket.emit("join room", roomId);
    console.log(`Joined room ${roomId}`);

    // 서버로부터 메시지 수신 처리
    socket.on("chat message", (data: { roomId: string; answer: string }) => {
        console.log(`AI Bot: ${data.answer}`);
    });

    // 사용자로부터 입력받아 메시지를 서버로 전송하는 함수
    function sendMessage() {
        rl.question("Enter your message: ", (message: string) => {
            const sender = "Node Client"; // 메시지 보낸 사람
            const questionMessage: QuestionMessage = { sender, question: message };

            // 서버로 메시지 전송
            socket.emit("chat message", { roomId, msg: questionMessage });

            // 다음 메시지 입력 대기
            sendMessage();
        });
    }

    // 메시지 전송 시작
    sendMessage();

    // Ctrl+C (SIGINT) 처리
    rl.on("SIGINT", () => {
        console.log("\nDisconnecting...");
        rl.close();
        socket.disconnect();
        process.exit(0);
    });
});

// 서버와 연결이 끊어졌을 때 처리
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
