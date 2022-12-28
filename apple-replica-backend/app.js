import express, { json, urlencoded } from "express";
import { ConnectDB } from "./db.js";
import cors from "cors";
import IndexRoute from "./Routes/index.js";
import passport from "passport";
import errorMiddleware from "./Middleware/error.js";
import bodyParser from "body-parser";

const app = express();
import dotenv from "dotenv";

dotenv.config();
ConnectDB();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

import "./Config/passport.js";

passport.initialize();

const PORT = process.env.PORT;

app.use("/api/v1", IndexRoute);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
