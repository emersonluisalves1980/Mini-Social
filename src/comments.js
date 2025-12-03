// src/comments.js
const axios = require('axios');
const BASE = 'https://jsonplaceholder.typicode.com';

async function commentsForPost(postId) {
  const res = await axios.get(`${BASE}/comments`, { params: { postId } });
  return res.data;
}

module.exports = { commentsForPost };
