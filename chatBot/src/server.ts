import createApp from "./app";
import http from "http";
import { init } from "./io";
import { Application } from "express";

(async () => {
    await createApp()
        .then((app : Application) => {
            const server = http.createServer(app);
            init(server);
            server.listen(3000, () => {
                console.log("Server listening on 3000");
            });
        })
        .catch((error : any) => {
            console.error("server error");
        })
})(); 