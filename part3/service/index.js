const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), {
  flags: "a",
});

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    { stream: logStream }
  )
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send("Bad request, no id provided");
  }
  const person = persons.find((person) => person.id == id);
  if (!person) {
    res.status(404).send(`Person with id ${id} doesn't exist`);
  }

  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req?.body ?? {};
  console.log(req.body);
  if (!name) {
    res.status(400).send("Bad request, missing name");
  }
  if (!number) {
    res.status(400).send("Bad request, missing number");
  }
  const existingName = persons.find((person) => person.name === name);
  if (existingName) {
    res
      .status(400)
      .send(`Bad request, person with name: ${name} already exists`);
  }
  const id = Math.floor(Math.random() * 1000);
  const person = {
    name,
    number,
    id,
  };
  persons.push(person);
  res.status(201).json(person);
});

app.get("/info", (req, res) => {
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

app.delete("/api/persons/:id", (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send("Bad request, no id provided");
  }
  const person = persons.find((person) => person.id == id);
  if (!person) {
    res.status(404).send(`Person with id ${id} doesn't exist`);
  }

  persons = persons.filter((person) => person.id != id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
