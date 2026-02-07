import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients";
import diagnosisRouter from "./routes/diagnosis";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(3001, () => {
  console.log("server started at port 3001");
});
