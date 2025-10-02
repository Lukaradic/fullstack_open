require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), {
  flags: "a",
});

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    { stream: logStream }
  )
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => res.json(result));
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send("Bad request, no id provided");
  }
  const person = await Person.findById(id);
  if (!person) {
    res.status(404).send(`Person with id ${id} doesn't exist`);
  }

  res.json(person);
});

app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, number } = req?.body ?? {};

    if (!name) {
      res.status(400).send("Bad request, missing name");
    }
    if (!number) {
      res.status(400).send("Bad request, missing number");
    }

    const person = new Person({
      name,
      number,
    });

    const response = await person.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/info", async (req, res) => {
  const persons = await Person.find({});
  const info = {
    message: `Phonebook has info for ${persons.length} people`,
    date: new Date().toString(),
  };
  res.send(`
  <div>
    <p>${info.message}</p>
    <p>${info.date}</p>
  </div>
  `);
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send("Bad request, no id provided");
  }

  await Person.findByIdAndDelete(id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.put("/api/persons/:id", async (req, res) => {
  const id = req?.params?.id;
  const { name, number } = req?.body;
  if (!id) {
    res.status(404).send("Bad request, no id provided");
  }
  await Person.findOneAndUpdate({ name }, { number }, { runValidators: true });
  res.status(200).json({ _id: id, name, number });
});

app.use(errorHandler);
