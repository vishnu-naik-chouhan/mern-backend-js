import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
