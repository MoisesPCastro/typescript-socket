import express from "express";
import "dotenv/config";
import cors from "cors";
import https from "http";

import "./shared/services/TranslationsYup";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
const server = https.createServer(app);
export default server;
