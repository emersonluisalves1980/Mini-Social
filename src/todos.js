// src/todos.js
function markCompleted(todo) {
  if (typeof todo !== 'object' || todo === null) throw new Error('invalid todo');
  return Object.assign({}, todo, { completed: true });
}

function toggle(todo) {
  if (typeof todo !== 'object' || todo === null) throw new Error('invalid todo');
  return Object.assign({}, todo, { completed: !Boolean(todo.completed) });
}

module.exports = { markCompleted, toggle };
