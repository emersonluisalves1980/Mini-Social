// src/posts.js
const axios = require('axios');
const BASE = 'https://jsonplaceholder.typicode.com';

async function listPosts() {
  const res = await axios.get(`${BASE}/posts`);
  return res.data;
}

// cria um "post fake" (não persiste no serviço real)
function createFakePost(userId, title, body) {
  if (!userId || !title) throw new Error('userId and title required');
  return {
    userId,
    id: Math.floor(Math.random() * 1000000),
    title,
    body: body || ''
  };
}

async function postsByUser(userId) {
  const res = await axios.get(`${BASE}/posts`, { params: { userId } });
  return res.data;
}

module.exports = {
  listPosts,
  createFakePost,
  postsByUser
};
