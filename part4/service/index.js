import express from "express";
import blogRouter from "./src/routes/blogRoutes.js";

const app = express();
app.use(express.json());
app.use(blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
