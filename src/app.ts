import express from "express";
import logger from "morgan";

import Environment from "./config/environment";
import indexRouter from "./routes/index";
import resumeRouter from "./routes/resume";
import { teamsBot } from "./bot/teams-bot";

const env = new Environment();
const app = express();

app.use(logger("dev", { skip: () => !env.app.inProd }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/resume", resumeRouter(env.experience));

// Setup an endpoint on the router for the bot to listen.
// NOTE: This endpoint cannot be changed and must be api/messages
app.post("/api/messages", teamsBot(env).listen());

export default app;
