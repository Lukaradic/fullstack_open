import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

blogSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
