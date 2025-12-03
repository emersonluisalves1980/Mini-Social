// src/localServer.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, '..', 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ---- Endpoints baseados em db.json ----
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.get('/api/posts', (req, res) => {
  const db = readDB();
  res.json(db.posts);
});

app.post('/api/posts', (req, res) => {
  const db = readDB();
  const newPost = {
    id: db.posts.length + 1,
    userId: req.body.userId || 1,
    title: req.body.title,
    body: req.body.body
  };
  db.posts.push(newPost);
  writeDB(db);
  res.status(201).json(newPost);
});

app.get('/api/posts/:id/comments', (req, res) => {
  const db = readDB();
  const comments = db.comments.filter(c => c.postId === Number(req.params.id));
  res.json(comments);
});

app.get('/api/todos', (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

app.patch('/api/todos/:id', (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  Object.assign(todo, req.body);
  writeDB(db);
  res.json(todo);
});

// ---- Inicialização opcional ----
if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`📦 API local rodando na porta ${port}`));
}

module.exports = app;
