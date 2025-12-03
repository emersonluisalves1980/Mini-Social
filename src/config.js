// src/config.js
const CONFIG = {
  // base padrão: JSONPlaceholder
  BASE_URL: process.env.API_BASE || 'https://jsonplaceholder.typicode.com',

  // para My JSON Server, defina variável de ambiente:
  // export API_BASE="https://my-json-server.typicode.com/seu-usuario/mini-social-db"
};

module.exports = CONFIG;
