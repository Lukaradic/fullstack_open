import express from "express";
import blogRouter from "./src/routes/blogRoutes.js";
import connection from "./src/config/db.js";

export const app = express();
app.use(express.json());
app.use(blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
