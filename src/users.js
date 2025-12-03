// src/users.js
const axios = require('axios');

const BASE = 'https://jsonplaceholder.typicode.com';

async function fetchAllUsers() {
  const res = await axios.get(`${BASE}/users`);
  return res.data;
}

async function findUserById(id) {
  const res = await axios.get(`${BASE}/users/${id}`);
  return res.data;
}

function filterUsersByCity(users, city) {
  if (!Array.isArray(users)) throw new Error('users must be an array');
  return users.filter(u => u.address && u.address.city === city);
}

module.exports = {
  fetchAllUsers,
  findUserById,
  filterUsersByCity
};
