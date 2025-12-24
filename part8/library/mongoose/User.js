import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  password: {
    type: String,
    requred: true,
    minLength: 5,
  },
  favoriteGenre: {
    type: String,
    requred: true,
    minLength: 4,
  },
});

schema.plugin(uniqueValidator);

schema.set("toJSON", {
  transform: (_, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.password;
  },
});

export const User = mongoose.model("user", schema);
