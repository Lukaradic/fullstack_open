const mongoose = require("mongoose");
const password = encodeURIComponent(process.env.DB_PASSWORD);
const db = process.env.DB_NAME;
const url = `mongodb+srv://radicluka17_db_user:${password}@cluster0.8fxjf29.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("phonebook", phonebookSchema);

module.exports = Person;
