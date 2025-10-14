import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minlength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj.passwordHash;
    delete returnObj.__v;
    delete returnObj._id;
  },
});

export const User = mongoose.model("User", userSchema);
