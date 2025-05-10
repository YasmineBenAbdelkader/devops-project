const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Création de l'application Express
const app = express();
const port = 5000;

// Middleware pour parser le JSON et gérer CORS
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Modèle Todo
const Todo = mongoose.model('Todo', new mongoose.Schema({
  text: String
}));

// Route pour récupérer tous les todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour ajouter un todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route pour modifier un todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedTodo) {
      return res.status(404).send('Todo non trouvé');
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Route pour supprimer un todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send('Todo non trouvé');
    }
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Lancer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
