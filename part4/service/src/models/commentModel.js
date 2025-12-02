import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj.__v;
    delete returnObj._id;
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
