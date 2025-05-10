// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Modèle
const Todo = mongoose.model('Todo', new mongoose.Schema({ text: String }));

// Routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);  // Notez le 201 ici
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).send('Todo non trouvé');
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).send('Todo non trouvé');
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;  // Très important pour les tests
