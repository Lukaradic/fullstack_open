import express from "express";
import blogRouter from "./src/routes/blogRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import connection from "./src/config/db.js";

import { tokenExtractor, userExtractor } from "./src/middleware/token.js";

export const app = express();
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", userExtractor);
app.use(blogRouter);
app.use(userRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
