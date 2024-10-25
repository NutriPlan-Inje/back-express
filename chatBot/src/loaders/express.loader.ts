import { Application, json, urlencoded } from "express";

export default async ({ app }: { app: Application }) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));

    app.use("/chat");
};
