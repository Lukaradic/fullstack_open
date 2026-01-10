import express from "express";
import router from "./routes";

const app = express();
app.use(router);
app.use(express.json());

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
