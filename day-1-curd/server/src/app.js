import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import listRouter from "./routes/list.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/list", listRouter);

export default app;
