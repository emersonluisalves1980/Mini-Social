// src/app.js
const express = require('express');
const bodyParser = require('body-parser');

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/users', async (req, res) => {
  try {
    const data = await users.fetchAllUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await users.findUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const data = await posts.listPosts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/posts/fake', (req, res) => {
  try {
    const { userId, title, body } = req.body;
    const p = posts.createFakePost(userId, title, body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// se for executado diretamente, iniciar servidor
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
}

module.exports = app;
