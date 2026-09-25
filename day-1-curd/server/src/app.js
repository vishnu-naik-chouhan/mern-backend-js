import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import listRouter from "./routes/list.routes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/list", listRouter);

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
