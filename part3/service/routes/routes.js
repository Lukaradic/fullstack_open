const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/api/persons', (_, res) => {
  Person.find({}).then((result) => res.json(result));
});

router.get('/api/persons/:id', async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send('Bad request, no id provided');
  }
  const person = await Person.findById(id);
  if (!person) {
    res.status(404).send(`Person with id ${id} doesn't exist`);
  }

  res.json(person);
});

router.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req?.body ?? {};

    if (!name) {
      res.status(400).send('Bad request, missing name');
    }
    if (!number) {
      res.status(400).send('Bad request, missing number');
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

router.get('/info', async (_, res) => {
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

router.delete('/api/persons/:id', async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    res.status(404).send('Bad request, no id provided');
  }

  await Person.findByIdAndDelete(id);
  res.status(204).end();
});

router.put('/api/persons/:id', async (req, res) => {
  const id = req?.params?.id;
  const { name, number } = req?.body || {};
  if (!id) {
    res.status(404).send('Bad request, no id provided');
  }
  await Person.findOneAndUpdate({ name }, { number }, { runValidators: true });
  res.status(200).json({ _id: id, name, number });
});

module.exports = router;
