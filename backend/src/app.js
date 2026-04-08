import cors from "cors";
import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

export const app = express();
const apiBasePath = process.env.VERCEL ? "/" : "/api";

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use(apiBasePath, routes);

app.use(notFound);
app.use(errorHandler);
