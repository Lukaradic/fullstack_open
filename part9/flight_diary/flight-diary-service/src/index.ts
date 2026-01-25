import express from "express";
import diaryRouter from "./routes/diaries";
import cors from "cors";
import router from "./routes/diaries";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
