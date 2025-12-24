import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});
schema.plugin(uniqueValidator);

schema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj.__v;
    delete returnObj._id;
  },
});

export const Author = mongoose.model("author", schema);
